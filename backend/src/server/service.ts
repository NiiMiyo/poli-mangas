import connectionHandler, { ConnectionHandler } from "./connectionHandler";

import ConnectorView from "./views/ConnectorView";
import MangaViews from "./views/MangaViews";
import ChapterViews from "./views/ChapterViews";

class ConnectionService {
	private handler: ConnectionHandler;
	constructor(handler: ConnectionHandler) {
		this.handler = handler;
	}

	getConnectorList() {
		const connectors = this.handler.connectorList;

		return ConnectorView.renderMany(connectors);
	}

	getConnector(connectorId: string) {
		const connector = this.handler.getConnector(connectorId);

		if (!connector) return undefined;

		return ConnectorView.render(connector);
	}

	async getMangaList(connectorId: string) {
		const connector = this.handler.getConnector(connectorId);

		if (!connector) return undefined;

		const mangas = await connector.getMangaList();

		return MangaViews.renderMany(mangas);
	}

	async getManga(connectorId: string, mangaId: string) {
		const connector = this.handler.getConnector(connectorId);

		if (!connector) return undefined;

		const manga = await connector.getManga(mangaId);

		if (!manga) return undefined;

		return MangaViews.render(manga);
	}

	async getChapterList(connectorId: string, mangaId: string) {
		const connector = this.handler.getConnector(connectorId);

		if (!connector) return undefined;

		const manga = await connector.getManga(mangaId);

		if (!manga) return undefined;

		const chapters = await manga.getChapterList();

		return ChapterViews.renderMany(chapters);
	}

	async getChapter(connectorId: string, mangaId: string, chapterId: string) {
		const connector = this.handler.getConnector(connectorId);

		if (!connector) return undefined;

		const manga = await connector.getManga(mangaId);

		if (!manga) return undefined;

		const chapter = await manga.getChapter(chapterId);

		if (!chapter) return undefined;

		return ChapterViews.render(chapter);
	}

	async getChapterPages(
		connectorId: string,
		mangaId: string,
		chapterId: string
	) {
		const connector = this.handler.getConnector(connectorId);

		if (!connector) return undefined;

		const manga = await connector.getManga(mangaId);

		if (!manga) return undefined;

		const chapter = await manga.getChapter(chapterId);

		if (!chapter) return undefined;

		let images = await chapter.getChapterImages();
		images = images.filter((link) => {
			const empty: any[] = [null, undefined];

			if (empty.includes(link)) return false;
			if (link.trim() === "") return false;

			return true;
		});

		return images;
	}
}

const connectionService = new ConnectionService(connectionHandler);

export default connectionService;
