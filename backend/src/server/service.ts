import {
	filterStringArray,
	multipleOr,
	removeAccents,
	unarray,
} from "../generics";

import connectionHandler, { ConnectionHandler } from "./connectionHandler";

import Connector from "../connectors/connector";
import Manga from "../connectors/manga";

import ConnectorViews from "../views/ConnectorViews";
import MangaViews, { MangaView } from "../views/MangaViews";

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

	async getMangaList(): Promise<MangaView[]>;
	async getMangaList(connectorId: string): Promise<MangaView[] | undefined>;

	async getMangaList(connectorId?: string) {
		let connectorsIds: string[];

		if (connectorId === undefined) {
			connectorsIds = this.getConnectorList().map((c) => c.id);
		} else {
			connectorsIds = [connectorId];
		}

		const connectors: Connector[] = [];

		connectorsIds.forEach((i) => {
			const c = this.handler.getConnector(i);
			if (c !== undefined) connectors.push(c);
		});

		const mangasDoubleArray = await Promise.all(
			connectors.map(async (c) => await c.getMangaList())
		);

		const mangasArray = unarray(mangasDoubleArray);
		const mangas = MangaViews.renderMany(mangasArray);

		const __return = mangas == [] ? undefined : mangas;

		return __return;
	}

	async getManga(connectorId: string, mangaId: string) {
		let manga = await this.handler.getManga(connectorId, mangaId);
		if (manga === undefined) return undefined;

		const data = filterMangaGenres({
			connector: connectorId,
			cover: manga.cover,
			genres: manga.genres,
			id: manga.id,
			title: manga.title,
		});

		manga.genres = data.genres;

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
