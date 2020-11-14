import connectionHandler, { ConnectionHandler } from "./connectionHandler";
import { filterStringArray } from "../generics";

import Connector from "../connectors/connector";

import ConnectorViews from "./views/ConnectorViews";
import { MangaView } from "./views/MangaViews";

function filterMangaGenres(manga: MangaView): MangaView {
	const { id, title, connector, cover } = manga;
	const genres = filterStringArray(manga.genres);

	return {
		id,
		title,
		cover,
		connector,
		genres,
	};
}

class ConnectionService {
	private handler: ConnectionHandler;
	constructor(handler: ConnectionHandler) {
		this.handler = handler;
	}

	getConnectorList() {
		const connectors = this.handler.connectorList;

		return ConnectorViews.renderMany(connectors);
	}

	getConnector(connectorId: string) {
		const validation = this.handler.validateConnector(connectorId);
		if (!validation) return undefined;

		const connector = this.handler.getConnector(connectorId) as Connector;

		return ConnectorViews.render(connector);
	}

	async getMangaList(connectorId: string) {
		let mangas = await this.handler.getMangaList(connectorId);

		if (mangas === undefined) return undefined;

		mangas = mangas.map(filterMangaGenres);

		return mangas;
	}

	async getManga(connectorId: string, mangaId: string) {
		let manga = await this.handler.getManga(connectorId, mangaId);
		if (manga === undefined) return undefined;

		manga.data = filterMangaGenres(manga.data);

		return manga;
	}

	async getChapterPages(
		connectorId: string,
		mangaId: string,
		chapterId: string
	) {
		const pages = await this.handler.getChapterPages(
			connectorId,
			mangaId,
			chapterId
		);

		if (pages === undefined) return undefined;

		return filterStringArray(pages);
	}
}

const connectionService = new ConnectionService(connectionHandler);

export default connectionService;
