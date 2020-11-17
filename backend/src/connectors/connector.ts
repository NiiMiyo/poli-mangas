import Manga from "./manga";
import Chapter from "./chapter";

export interface ConnectorProperties {
	name: string;
	id: string;

	baseUrl: string;
}

export default abstract class Connector {
	name: string;
	id: string;

	baseUrl: string;
	mangalistUrl?: string;

	pageModifier?: string;

	constructor(props: ConnectorProperties) {
		this.name = props.name;
		this.id = props.id;

		this.baseUrl = props.baseUrl;
	}

	abstract async getMangaList(): Promise<Manga[]>;

	abstract async getManga(mangaId: string): Promise<Manga | undefined>;

	abstract async getChapters(mangaId: string): Promise<Chapter[] | undefined>;
}
