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

		id = id.trim();
		genres = filterStringArray(genres);
		title = title.trim();
		cover = cover.trim();
		connector = connector.trim();

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
