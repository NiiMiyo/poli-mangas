export interface ConnectorProperties {
	name: string;
	id: string;

	baseUrl: string;
	
	mangaPageUrl?: string;
	pageModifier?: string;
}

export interface MangaProperties {
	title: string;
	id: string;
	genre: string | string[];

	genreSeparator: string;
}

export abstract class Manga {
	title: string;
	id: string;
	genres: string[];

	constructor(props: MangaProperties) {
		this.title = props.title.trim();
		this.id = props.id.trim();

		if (typeof props.genre == "string") {
			const genres = props.genre
				.split(props.genreSeparator)
				.map((g) => g.trim());
			this.genres = genres;
		} else {
			this.genres = props.genre;
		}
	}
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
		this.mangalistUrl = props.mangaPageUrl;

		this.pageModifier = props.pageModifier;
	}

	abstract async getMangaList(): Promise<Manga[]>;
}
