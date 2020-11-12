import Chapter, { ChapterProps } from "./chapter";

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

	constructor(props: MangaProperties, connector: string) {
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

	abstract async getChapterList(): Promise<ChapterProps[]>;

	abstract async getChapter(chapterId: string): Promise<Chapter | undefined>;
}
