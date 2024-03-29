import { multipleAnd, unarray } from "../generics";

import Connector from "../connectors/connector";
import ConnectorViews from "../views/ConnectorViews";

import Manga from "../connectors/manga";
import Chapter from "../connectors/chapter";

import MangaViews from "../views/MangaViews";
import ChapterViews from "../views/ChapterViews";

import mangayabu from "../connectors/mangayabu/mangayabu";
import unionmangas from "../connectors/unionmangas/unionmangas";

export class ConnectionHandler {
	private connectors: Connector[];

	constructor(...connectors: Connector[]) {
		this.connectors = connectors;
	}

	get connectorList(): Connector[] {
		return this.connectors;
	}

	getConnector(id: string): Connector | undefined {
		for (let i = 0; i < this.connectors.length; i++) {
			const connector = this.connectors[i];
			if (connector.id == id) {
				return connector;
			}
		}

		return undefined;
	}

	validateConnector(connectorId: string): boolean {
		const connector = this.getConnector(connectorId);

		return Boolean(connector);
	}

	async validateManga(
		connectorId: string,
		mangaId: string
	): Promise<boolean> {
		const connector = this.getConnector(connectorId);
		const manga = await connector?.getManga(mangaId);

		return multipleAnd(connector, manga);
	}

	async validateChapter(
		connectorId: string,
		mangaId: string,
		chapterId: string
	): Promise<boolean> {
		const connector = this.getConnector(connectorId);

		const manga = await connector?.getManga(mangaId);
		const chapter = await manga?.getChapter(chapterId);

		return multipleAnd(connector, manga, chapter);
	}

	async getMangaList(connectorId: string) {
		const connector = this.getConnector(connectorId);
		if (connector === undefined) return undefined;

		const mangas = await connector.getMangaList();

		return MangaViews.renderMany(mangas);
	}

	async getManga(connectorId: string, mangaId: string) {
		const validation = await this.validateManga(
			connectorId,
			mangaId
		);
		if (!validation) return undefined;

		const connector = this.getConnector(connectorId) as Connector;

		const manga = (await connector.getManga(mangaId)) as Manga;

		const data = await Promise.all([
			manga.getSynopsis(),
			manga.getChapterList(),
			manga.getStatus(),
			manga.getAuthor(),
			manga.getYear(),
		]);

		const [synopsis, chapters, status, author, year] = data;

		const { id, cover, genres, title } = MangaViews.render(manga);

		return {
			id,
			title,
			cover,
			synopsis,
			genres,
			status,
			author,
			year,
			connector: ConnectorViews.render(connector),

			chapters: ChapterViews.renderMany(chapters),
		};
	}

	async getChapterList(connectorId: string, mangaId: string) {
		const validation = await this.validateManga(
			connectorId,
			mangaId
		);
		if (!validation) return undefined;

		const connector = this.getConnector(connectorId) as Connector;

		const manga = (await connector.getManga(mangaId)) as Manga;

		const chapters = await manga.getChapterList();

		return ChapterViews.renderMany(chapters);
	}

	async getChapter(
		connectorId: string,
		mangaId: string,
		chapterId: string
	) {
		const validation = await this.validateChapter(
			connectorId,
			mangaId,
			chapterId
		);

		if (!validation) return undefined;

		const connector = this.getConnector(connectorId) as Connector;

		const manga = (await connector.getManga(mangaId)) as Manga;

		const chapter = (await manga.getChapter(chapterId)) as Chapter;

		return ChapterViews.render(chapter);
	}

	async getChapterPages(
		connectorId: string,
		mangaId: string,
		chapterId: string
	) {
		const validation = await this.validateChapter(
			connectorId,
			mangaId,
			chapterId
		);

		if (!validation) return undefined;

		const connector = this.getConnector(connectorId) as Connector;

		const manga = (await connector.getManga(mangaId)) as Manga;

		const chapter = (await manga.getChapter(chapterId)) as Chapter;

		const images = await chapter.getChapterImages();

		return images;
	}

	async getAllMangas() {
		const mangasSquare = await Promise.all(
			this.connectorList.map(async (c) => {
				const m = await c.getMangaList();
				return m;
			})
		);

		const mangas = unarray(mangasSquare);

		return MangaViews.renderMany(mangas);
	}
}

const handler = new ConnectionHandler(mangayabu, unionmangas);

export default handler;
