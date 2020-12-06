import Connector, { ConnectorProperties } from "../connector";

import { fetchDom, fetchJson, loadEnv, unarray } from "../../generics";
import Manga from "../manga";
import Chapter from "../chapter";

import { domToChapterImages, domToChapter } from "./domHandler";
import { MangaYabuTypes } from "./mangayabutypes.d";

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
		const response: MangaYabuTypes.Manga[] = await fetchJson(
			API_URL
		);

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

		for (let i = 0; i < mangas.length; i++) {
			const m = mangas[i];
			if (m.id === mangaId) return m;
		}

		return undefined;
	}

	async getChapters(
		mangaId: string
	): Promise<MangaYabuChapter[] | undefined> {
		const manga = await this.getManga(mangaId);

		if (manga === undefined) return undefined;

		const chapters = await manga.getChapterList();

		return chapters;
	}
}

class MangaYabuManga extends Manga {
	url: string;

	constructor(mangaProps: MangaYabuTypes.Manga) {
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
		const chaptersDom = dom.getElementsByClassName(
			"single-chapter"
		);

		const chapters = Array.from(chaptersDom).map((d) => {
			const api = domToChapter(d);
			return new MangaYabuChapter(api);
		});

		return chapters;
	}

	async getChapter(
		chapterId: string
	): Promise<MangaYabuChapter | undefined> {
		const chapters = await this.getChapterList();

		for (let i = 0; i < chapters.length; i++) {
			const cap = chapters[i];
			if (cap.id == chapterId) return cap;
		}
		return undefined;
	}

	async getSynopsis(): Promise<string> {
		const synopsisPrefix = " Sinopse";

		const dom = (await fetchDom(this.url)).window.document;
		const synopsisDiv = dom.getElementsByClassName(
			"manga-synopsis"
		)[0];

		const textContent = synopsisDiv.textContent;
		let text = textContent !== null ? textContent : "";

		text = text.slice(synopsisPrefix.length);

		return text.trim();
	}

	async getStatus(): Promise<string> {
		const dom = (await fetchDom(this.url)).window.document;
		const statusDiv = dom.getElementsByClassName("manga-status")[0];

		const statusPrefix = "Status:";

		const textContent = statusDiv.textContent;
		let text = textContent !== null ? textContent : "";

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
	constructor(props: MangaYabuTypes.Chapter) {
		super(props);
	}

	async getChapterImages(): Promise<string[]> {
		const dom = (await fetchDom(this.link)).window.document;

		const pagesDom = dom.getElementsByClassName("manga-pages");

		let pages = unarray(
			Array.from(pagesDom).map((pd) => domToChapterImages(pd))
		);

		return pages;
	}
}

const connector = new MangaYabuConnector(mangayabuProps);

export default connector;
