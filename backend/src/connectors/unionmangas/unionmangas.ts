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
	description: string;
	status: string;

	url: string;

	constructor(props: UnionMangasMangaApiResponse) {
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
		const apiResponse: ChapterApiResponse[] = await fetchJson(
			CHAPTERS_API_URL + this.id
		);

		return apiResponse.map((c) => new UnionMangasChapter(c));
	}

	async getChapter(chapterId: string): Promise<UnionMangasChapter | undefined> {
		const chapters = await this.getChapterList();

		let chapterIndex = -1;

		for (let i = 0; i < chapters.length; i++) {
			const c = chapters[i];
			if (c.id == chapterId) {
				chapterIndex = i;
				break;
			}
		}

		if (chapterIndex < 0) return undefined;

		return chapters[chapterIndex];
	}

	async getSynopsis(): Promise<string> {
		return this.description;
	}

	async getStatus(): Promise<string> {
		return this.status;
	}

	async getAuthor(): Promise<string> {
		const res = (await fetchJson(this.url)) as UnionMangasMangaApiResponse;
		const { listAuthors } = res;

		const authors = listAuthors.map((a) => a.name.trim()).join(", ");
		return authors;
	}

	async getYear(): Promise<string> {
		const res = (await fetchJson(this.url)) as UnionMangasMangaApiResponse;
		const { listYear } = res;

		const year = listYear.map((y) => y.name.trim()).join(" - ");
		return year;
	}
}

class UnionMangasChapter extends Chapter {
	constructor(props: ChapterApiResponse) {
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
