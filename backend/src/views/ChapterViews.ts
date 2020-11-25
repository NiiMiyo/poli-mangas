import Chapter from "../connectors/chapter";

export default {
	render(chapter: Chapter) {
		const { id, title } = chapter;

		return {
			id,
			title,
		};
	},

	renderMany(chapters: Chapter[]) {
		return chapters.map(this.render);
	},
};
