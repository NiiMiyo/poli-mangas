import Connector, { ConnectorProperties } from "../connector";
import Manga, { MangaProperties } from "../manga";
import Chapter, { ChapterProperties } from "../chapter";

import { fetchJson, loadEnv, range } from "../../generics";
import { UnionMangasTypes } from "./unionmangastypes";

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
		const apiResponse: UnionMangasTypes.Api = await fetchJson(API_URL);

		let mangasApi = apiResponse.lsDocument;
		const recode = apiResponse.totalRecode;

		const startPage = 2;
		const endPage = recode / mangasApi.length + 2;

		const totalPages = range(startPage, endPage);

		await Promise.all(
			totalPages.map(async (p) => {
				const apiRes: UnionMangasTypes.Api = await fetchJson(
					API_URL + p
				);

				mangasApi = mangasApi.concat(apiRes.lsDocument);
			})
		);

		const mangas = mangasApi.map((m) => new UnionMangasManga(m));

		return mangas;
	}

	async getManga(mangaId: string): Promise<UnionMangasManga | undefined> {
		const mangaInfo: UnionMangasTypes.Manga = await fetchJson(
			MANGA_INFO_API_URL + mangaId
		);

		if ([null, "null"].includes(mangaInfo.id)) return undefined;

		return new UnionMangasManga(mangaInfo);
	}

	async getChapters(mangaId: string): Promise<Chapter[] | undefined> {
		const manga = await this.getManga(mangaId);
		if (manga === undefined) return undefined;

		const chapters = await manga.getChapterList();

		return chapters;
	}
}

class UnionMangasManga extends Manga {
	description: string;
	status: string;

	url: string;

	constructor(props: UnionMangasTypes.Manga) {
		const convertedProps: MangaProperties = {
			id: props.id,
			title: props.name,
			cover: props.image,
			genres: props.listGenres.map((g) => g.name),
		};

		super(convertedProps, unionmangasProps.id);

		this.description = props.description;
		this.status = props.statusName;
		this.url = MANGA_INFO_API_URL + this.id;
	}

	async getChapterList(): Promise<UnionMangasChapter[]> {
		const apiResponse: UnionMangasTypes.Chapter[] = await fetchJson(
			CHAPTERS_API_URL + this.id
		);

		return apiResponse.map((c) => new UnionMangasChapter(c));
	}

	async getChapter(
		chapterId: string
	): Promise<UnionMangasChapter | undefined> {
		const chapters = await this.getChapterList();

		for (let i = 0; i < chapters.length; i++) {
			const c = chapters[i];
			if (c.id === chapterId) return c;
		}

		return undefined;
	}

	async getSynopsis(): Promise<string> {
		return this.description;
	}

	async getStatus(): Promise<string> {
		return this.status;
	}

	async getAuthor(): Promise<string> {
		const res: UnionMangasTypes.Manga = await fetchJson(this.url);
		const { listAuthors } = res;

		const authorArray = listAuthors.map((a) => a.name.trim());

		const authors = authorArray.join(", ");
		return authors;
	}

	async getYear(): Promise<string> {
		const res: UnionMangasTypes.Manga = await fetchJson(this.url);
		const { listYear } = res;

		const yearArray = listYear.map((y) => y.name.trim());

		const year = yearArray.join(" - ");
		return year;
	}
}

class UnionMangasChapter extends Chapter {
	constructor(props: UnionMangasTypes.Chapter) {
		const titlePrefix = "Capítulo #";
		const title = props.name.slice(titlePrefix.length);

		const convertedProps: ChapterProperties = {
			id: props.id,
			link: unionmangasProps.baseUrl + "view-" + props.id,

			title,
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
