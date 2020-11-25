import Connector, { ConnectorProperties } from "../connector";

import { fetchDom, fetchJson, loadEnv } from "../../generics";
import Manga from "../manga";
import Chapter from "../chapter";

import { DomToChapterImages, DomToChapterResponse } from "./domHandler";

const { API_URL, MANGA_PAGE } = loadEnv(__dirname, "mangayabu.env");

const mangayabuProps: ConnectorProperties = {
	name: "MangaYabu!",
	id: "mangayabu",

	baseUrl: "https://mangayabu.top/",
};

class MangaYabuConnector extends Connector {
	constructor(connectorProps: ConnectorProperties) {
		super(connectorProps);
	}

	async getMangaList(): Promise<MangaYabuManga[]> {
		const response = (await fetchJson(API_URL)) as MangaYabuApiResponse[];

		let mangasApi = response.filter((m) => {
			return m.slug != "null";
		});

		const mangas = mangasApi.map((manga) => {
			manga.cover = this.baseUrl + manga.cover;
			return new MangaYabuManga(manga);
		});

		return mangas;
	}

	async getManga(mangaId: string): Promise<MangaYabuManga | undefined> {
		const mangas = await this.getMangaList();

		const mangasIds = mangas.map((m) => m.id);

		const indexOf = mangasIds.indexOf(mangaId);

		if (indexOf < 0) return undefined;

		return mangas[indexOf];
	}

	async getChapters(mangaId: string): Promise<MangaYabuChapter[] | undefined> {
		const manga = await this.getManga(mangaId);

		if (manga === undefined) return undefined;

		const chaptersApi = await manga.getChapterList();

		const chapters = chaptersApi.map((cap) => new MangaYabuChapter(cap));

		return chapters;
	}
}

class MangaYabuManga extends Manga {
	url: string;

	constructor(mangaProps: MangaYabuApiResponse) {
		const genreSeparator = /[,.]+/;
		let genre = mangaProps.genre.split(genreSeparator);

		genre = genre.map((g) => g.trim());
		genre = genre.filter((g) => {
			return g !== "null";
		});

		super(
			{
				title: mangaProps.title,
				id: mangaProps.slug,
				genres: genre,
				cover: mangaProps.cover,
			},
			mangayabuProps.id
		);
		this.url = MANGA_PAGE + this.id;
	}

	async getChapterList(): Promise<MangaYabuChapter[]> {
		const dom = (await fetchDom(this.url)).window.document;
		const chaptersDom = dom.getElementsByClassName("single-chapter");

		const chapters: MangaYabuChapter[] = [];

		for (let i = 0; i < chaptersDom.length; i++) {
			const element = chaptersDom[i];
			const api = DomToChapterResponse(element);

			chapters.push(new MangaYabuChapter(api));
		}

		return chapters;
	}

	async getChapter(chapterId: string): Promise<MangaYabuChapter | undefined> {
		const chapters = await this.getChapterList();

		for (let i = 0; i < chapters.length; i++) {
			const cap = chapters[i];

			if (cap.id == chapterId) {
				return new MangaYabuChapter(cap);
			}
		}
		return undefined;
	}

	async getSynopsis(): Promise<string> {
		const synopsisPrefix = " Sinopse";

		const dom = (await fetchDom(this.url)).window.document;
		const synopsisDiv = dom.getElementsByClassName("manga-synopsis")[0];
		let text = synopsisDiv.textContent as string;
		text = text.slice(synopsisPrefix.length);

		return text.trim();
	}

	async getStatus(): Promise<string> {
		const dom = (await fetchDom(this.url)).window.document;
		const statusDiv = dom.getElementsByClassName("manga-status")[0];

		const statusPrefix = "Status:";
		let text = statusDiv.textContent as string;
		text = text.slice(statusPrefix.length);
		return text.trim();
	}

	async getAuthor(): Promise<string> {
		// TODO: Encontrar o autor se possível
		return "";
	}

	async getYear(): Promise<string> {
		// TODO: Encontrar o ano se possível
		return "";
	}
}

class MangaYabuChapter extends Chapter {
	constructor(props: MangaYabuChapterResponse) {
		super(props);
	}

	async getChapterImages(): Promise<string[]> {
		const dom = (await fetchDom(this.link)).window.document;

		const pagesDom = dom.getElementsByClassName("manga-pages");

		let pages: string[] = [];

		for (let i = 0; i < pagesDom.length; i++) {
			const page = pagesDom[i];
			const pageImages = DomToChapterImages(page);

			pages = pages.concat(pageImages);
		}

		return pages;
	}
}

const connector = new MangaYabuConnector(mangayabuProps);

export default connector;
