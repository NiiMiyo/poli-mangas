import Connector, { ConnectorProperties } from "../connector";
import Manga, { MangaProperties } from "../manga";
import Chapter, { ChapterProperties } from "../chapter";

import { fetchJson, loadEnv, range } from "../../generics";

const {
	API_URL,
	MANGA_INFO_API_URL,
	CHAPTERS_API_URL,
	CHAPTER_IMAGES_API_URL,
} = loadEnv(__dirname, "unionmangas.env");

const unionmangasProps: ConnectorProperties = {
	name: "Union Mangás",
	id: "unionmangas",

	baseUrl: "https://unionmangas.xyz/",
};

class UnionMangasConnector extends Connector {
	constructor(props: ConnectorProperties) {
		super(props);
	}

	async getMangaList(): Promise<UnionMangasManga[]> {
		const apiResponse = await fetchJson(API_URL);

		const mangasApi = apiResponse.lsDocument as UnionMangasMangaApiResponse[];
		const recode: number = apiResponse.totalRecode;

		const mangas = mangasApi.map((m) => new UnionMangasManga(m));

		const startPage = 2;
		const endPage = recode / mangasApi.length + 2;

		const totalPages = range(startPage, endPage);

		await Promise.all(
			totalPages.map(async (p) => {
				const pageMangas = (await fetchJson(API_URL + p))
					.lsDocument as UnionMangasMangaApiResponse[];

				pageMangas.forEach((m) => {
					mangas.push(new UnionMangasManga(m));
				});
			})
		);

		return mangas;
	}

	async getManga(mangaId: string): Promise<UnionMangasManga | undefined> {
		const apiResponse: UnionMangasMangaApiResponse = await fetchJson(
			MANGA_INFO_API_URL + mangaId
		);

		if ([null, "null"].includes(apiResponse.id)) return undefined;

		return new UnionMangasManga(apiResponse);
	}

	async getChapters(mangaId: string): Promise<Chapter[] | undefined> {
		const manga = await this.getManga(mangaId);
		if (manga === undefined) return undefined;

		const chapters = await manga.getChapterList();

		return chapters;
	}
}

class UnionMangasManga extends Manga {
	constructor(props: UnionMangasMangaApiResponse) {
		const convertedProps: MangaProperties = {
			id: props.id,
			title: props.name,
			cover: props.image,
			genres: props.listGenres.map((g) => g.name),
		};

		super(convertedProps, unionmangasProps.id);
	}

	async getChapterList(): Promise<UnionMangasChapter[]> {
		const apiResponse: ChapterApiResponse[] = await fetchJson(
			CHAPTERS_API_URL + this.id
		);

		return apiResponse.map((c) => new UnionMangasChapter(c));
	}

	async getChapter(
		chapterId: string
	): Promise<UnionMangasChapter | undefined> {
		const chapters = await this.getChapterList();
		const chaptersIds = chapters.map((c) => c.id);

		const chapterIndex = chaptersIds.indexOf(chapterId);

		if (chapterIndex < 0) return undefined;

		return chapters[chapterIndex];
	}
}

class UnionMangasChapter extends Chapter {
	constructor(props: ChapterApiResponse) {
		const convertedProps: ChapterProperties = {
			id: props.id,
			link: unionmangasProps.baseUrl + "view-" + props.id,

			title: props.nameSeo,
		};
		super(convertedProps);
	}

	async getChapterImages(): Promise<string[]> {
		const apiResponse: string = (
			await fetchJson(CHAPTER_IMAGES_API_URL + this.id)
		).image;

		return apiResponse.split("#");
	}
}

const connector = new UnionMangasConnector(unionmangasProps);

export default connector;
