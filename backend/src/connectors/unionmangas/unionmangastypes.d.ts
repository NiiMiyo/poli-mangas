export namespace UnionMangasTypes {
	type Manga = {
		id: string;
		name: string;
		image: string;
		description: string;
		statusName: string;

		listAuthors: Author[];
		listGenres: Genre[];
		listYear: Year[];
	};

	type Genre = {
		id: string;
		name: string;
		index: number;
	};

	type Author = {
		id: string;
		name: string;
	};

	type Chapter = {
		id: string;
		name: string;
		vol: null;
		nameSeo: string;
		image: null;
	};

	type Year = {
		name: string;
	};

	type Api = {
		lsDocument: Manga[];
		totalRecode: number;
		currentPage: number;
	};
}
