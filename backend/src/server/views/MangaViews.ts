import Manga from "../../connectors/manga";

export default {
	render(manga: Manga) {
		const { connector, id, genres: genreList, title } = manga;

		const genres = genreList.filter((g) => {
			const empty: any[] = [null, undefined];

			if (empty.includes(g)) return false;
			if (g.trim() === "") return false;

			return true;
		});

		return {
			id,
			title,
			connector,
			genres,
		};
	},

	renderMany(mangas: Manga[]) {
		return mangas.map(this.render);
	},
};
