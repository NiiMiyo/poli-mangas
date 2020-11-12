import Connector, { ConnectorProperties, Manga } from "../connector";
import path from "path";

import { fetchJson, loadEnv } from "../../generics";
const { API_URL } = loadEnv(__dirname, "mangayabu.env");

const mangayabuProps: ConnectorProperties = {
	name: "MangaYabu!",
	id: "mangayabu",

	baseUrl: "https://mangayabu.top",
};

interface MangaYabuApiResponse {
	hash: number;
	title: string;
	genre: string;
	videos: number;
	cover: string;
	type: string;
	slug: string;
}

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
}

class MangaYabuManga extends Manga {
	constructor(mangaProps: MangaYabuApiResponse) {
		super({
			title: mangaProps.title,
			id: mangaProps.slug,
			genre: mangaProps.genre,
			genreSeparator: ",",
		});
	}
}

const connector = new MangaYabuConnector(mangayabuProps);

export default connector;
