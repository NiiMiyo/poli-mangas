import Chapter from "./chapter";

export interface MangaProperties {
	title: string;
	id: string;
	cover: string;

	genres: string[];
}

export default abstract class Manga {
	title: string;
	id: string;
	cover: string;
	connector: string;

	genres: string[];

	constructor(props: MangaProperties, connector: string) {
		this.title = props.title.trim();
		this.id = props.id.trim();
		this.cover = props.cover;
		this.connector = connector;

		this.genres = props.genres;
	}

	abstract async getChapterList(): Promise<Chapter[]>;

	abstract async getChapter(chapterId: string): Promise<Chapter | undefined>;
}
