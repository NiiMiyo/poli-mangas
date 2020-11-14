import Chapter, { ChapterProperties } from "./chapter";

export interface MangaProperties {
	title: string;
	id: string;
	genre: string | string[];

	genreSeparator: string;
}

export default abstract class Manga {
	title: string;
	id: string;
	genres: string[];

	connector: string;

	constructor(props: MangaProperties, connector: string) {
		this.title = props.title.trim();
		this.id = props.id.trim();

		this.connector = connector;

		if (typeof props.genre == "string") {
			const genres = props.genre
				.split(props.genreSeparator)
				.map((g) => g.trim());
			this.genres = genres;
		} else {
			this.genres = props.genre;
		}
	}

	abstract async getChapterList(): Promise<Chapter[]>;

	abstract async getChapter(chapterId: string): Promise<Chapter | undefined>;
}
