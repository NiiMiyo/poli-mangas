import {
	filterStringArray,
	multipleOr,
	removeAccents,
	unarray,
} from "../generics";

import connectionHandler, {
	ConnectionHandler,
} from "../server/connectionHandler";

import Connector from "../connectors/connector";

import ConnectorViews from "../views/ConnectorViews";
import MangaViews, { MangaView } from "../views/MangaViews";

function filterSearchManga(searchTerm: string, manga: MangaView): boolean {
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

		const connector = this.handler.getConnector(
			connectorId
		) as Connector;

		return ConnectorViews.render(connector);
	}

	async getMangaList(): Promise<MangaView[]>;
	async getMangaList(
		connectorId: string
	): Promise<MangaView[] | undefined>;

	async getMangaList(connectorId?: string) {
		let connectorsIds: string[];

		if (connectorId === undefined) {
			connectorsIds = this.getConnectorList().map(
				(c) => c.id
			);
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

		const __return = mangas.length === 0 ? undefined : mangas;

		return __return;
	}

	async getManga(connectorId: string, mangaId: string) {
		let manga = await this.handler.getManga(connectorId, mangaId);
		if (manga === undefined) return undefined;

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

	async searchManga(searchTerm: string): Promise<MangaView[]> {
		const mangas = await this.handler.getAllMangas();

		let filteredMangas = mangas.filter((m) => {
			return filterSearchManga(searchTerm, m);
		});

		return filteredMangas;
	}
}

const connectionService = new ConnectionService(connectionHandler);

export default connectionService;
