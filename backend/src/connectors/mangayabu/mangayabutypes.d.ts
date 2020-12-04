export namespace MangaYabuTypes {
	type Manga = {
		hash: number;
		title: string;
		genre: string;
		videos: number;
		cover: string;
		type: string;
		slug: string;
	};

	type Chapter = {
		id: string;
		link: string;
		title: string;
	};
}
