type UnionMangasMangaApiResponse = {
	id: string;
	name: string;
	image: string;

	listGenres: GenreApiResponse[];
};

type GenreApiResponse = {
	id: string;
	name: string;

	index: number;
};

type AuthorApiResponse = {
	id: string;
	name: string;
};

type ChapterApiResponse = {
	id: string;
	name: string;
	vol: null;
	nameSeo: string;
	image: null;
};
