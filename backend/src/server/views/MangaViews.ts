import Manga from "../../connectors/manga";

export type MangaView = {
	id: string;
	title: string;
	cover: string;
	connector: string;
	genres: string[];
};

export default {
	render(manga: Manga): MangaView {
		const { connector, id, genres, title, cover } = manga;

		return {
			id,
			title,
			cover,
			connector,
			genres,
		};
	},

	renderMany(mangas: Manga[]) {
		return Promise.all(mangas.map(this.render));
	},
};
