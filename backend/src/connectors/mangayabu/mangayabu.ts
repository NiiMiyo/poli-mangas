import Connector, { ConnectorProperties } from "../connector";
import path from "path";

import { fetchDom, fetchJson, loadEnv } from "../../generics";
import Manga from "../manga";
import Chapter from "../chapter";

import { DomToChapterImages, DomToChapterResponse } from "./domHandler";

const { API_URL, MANGA_PAGE } = loadEnv(__dirname, "mangayabu.env");

const mangayabuProps: ConnectorProperties = {
	name: "MangaYabu!",
	id: "mangayabu",

	baseUrl: "https://mangayabu.top",
};

class MangaYabuConnector extends Connector {
	constructor(connectorProps: ConnectorProperties) {
		super(connectorProps);
	}

	async getMangaList() {
		const body = (await fetchJson(API_URL)) as MangaYabuApiResponse[];

		const mangas: MangaYabuManga[] = [];

		body.forEach((manga) => {
			manga.cover = path.join(this.baseUrl, manga.cover);
			mangas.push(new MangaYabuManga(manga));
		});

		return mangas;
	}

	async getManga(mangaId: string): Promise<MangaYabuManga | undefined> {
		const mangas = await this.getMangaList();

		const mangasIds = mangas.map((m) => m.id);

		const indexOf = mangasIds.indexOf(mangaId);

		if (indexOf < 0) {
			return undefined;
		}

		const manga = mangas[indexOf];

		return manga;
	}

	async getChapters(
		mangaId: string
	): Promise<MangaYabuChapterResponse[] | undefined> {
		const manga = await this.getManga(mangaId);

		if (!manga) {
			return undefined;
		}

		const chapters = await manga.getChapterList();

		return chapters;
	}
}

class MangaYabuManga extends Manga {
	constructor(mangaProps: MangaYabuApiResponse) {
		super(
			{
				title: mangaProps.title,
				id: mangaProps.slug,
				genre: mangaProps.genre,
				genreSeparator: ",",
			},
			mangayabuProps.id
		);
	}

	async getChapterList(): Promise<MangaYabuChapterResponse[]> {
		const mangaPageUrl = MANGA_PAGE + this.id;

		const dom = (await fetchDom(mangaPageUrl)).window.document;
		const chaptersDom = dom.getElementsByClassName("single-chapter");

		const chapters: MangaYabuChapterResponse[] = [];

		for (let i = 0; i < chaptersDom.length; i++) {
			const element = chaptersDom[i];
			chapters.push(DomToChapterResponse(element));
		}

		return chapters;
	}

	async getChapter(chapterId: string): Promise<MangaYabuChapter | undefined> {
		const chapters = await this.getChapterList();
		for (let i = 0; i < chapters.length; i++) {
			const cap = chapters[i];
			if (cap.id == chapterId) {
				const chapter = new MangaYabuChapter(cap);
				return chapter;
			}
		}
		return undefined;
	}
}

class MangaYabuChapter extends Chapter {
	constructor(props: MangaYabuChapterResponse) {
		super(props);
	}

	async getChapterImages(): Promise<string[]> {
		const dom = (await fetchDom(this.link)).window.document;
		const pagesDom = dom.getElementsByClassName("manga-pages")[0];

		const pages: string[] = DomToChapterImages(pagesDom);

		return pages;
	}
}

const connector = new MangaYabuConnector(mangayabuProps);

export default connector;
