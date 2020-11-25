import Manga from "../connectors/manga";
import { filterStringArray } from "../generics";

export type MangaView = {
	id: string;
	title: string;
	cover: string;
	connector: string;
	genres: string[];
};

export default {
	render(manga: Manga): MangaView {
		let { connector, id, genres, title, cover } = manga;

		genres = filterStringArray(genres);

		return {
			id,
			title,
			cover,
			connector,
			genres,
		};
	},

	renderMany(mangas: Manga[]) {
		return mangas.map(this.render);
	},
};
