export interface ChapterProps {
	id: string | number;
	link: string;

	title?: string;
}

export default abstract class Chapter {
	id: string;
	link: string;

	title?: string;

	constructor(props: ChapterProps) {
		this.id = props.id.toString();
		this.link = props.link;
		this.title = props.title;
	}

	async abstract getChapterImages(): Promise<string[]>;
}
