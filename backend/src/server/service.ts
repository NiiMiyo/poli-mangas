import {
	filterStringArray,
	multipleOr,
	removeAccents,
	unarray,
} from "../generics";

import connectionHandler, { ConnectionHandler } from "./connectionHandler";

import Connector from "../connectors/connector";
import Manga from "../connectors/manga";

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

function filterSearchManga(searchTerm: string, manga: Manga): boolean {
	const id = removeAccents(manga.id.toLowerCase());
	const title = removeAccents(manga.title.toLowerCase());
	const genres = manga.genres.map((g) => removeAccents(g.toLowerCase()));

	let inGenres = false;
	for (let i = 0; i < genres.length; i++) {
		if (genres[i].includes(searchTerm)) {
			inGenres = true;
			break;
		}
	}

	return multipleOr(
		id.includes(searchTerm),
		title.includes(searchTerm),
		inGenres
	);
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

	async searchManga(searchTerm: string): Promise<Manga[]> {
		const connectors = this.handler.connectorList;
		const connectorsMangas = await Promise.all(
			connectors.map((c) => c.getMangaList())
		);
		const mangas = unarray(connectorsMangas);

		let filteredMangas = mangas.filter((m) => {
			return filterSearchManga(searchTerm, m);
		});

		return filteredMangas;
	}
}

const connectionService = new ConnectionService(connectionHandler);

export default connectionService;
