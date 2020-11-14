import Chapter from "../../connectors/chapter";

export default {
	render(chapter: Chapter) {
		const { id, link, title } = chapter;

		return {
			id,
			title,
			link,
		};
	},

	renderMany(chapters: Chapter[]) {
		return chapters.map(this.render);
	},
};
