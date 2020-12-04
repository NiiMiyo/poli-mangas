import { Request, Response } from "express";

import connectionService from "../services/connectionService";
import { chapterNotFound } from "../server/routes/responses";

export default {
	async index(request: Request, response: Response) {
		const { connectorId, mangaId, chapterId } = request.params;

		const pages = await connectionService.getChapterPages(
			connectorId,
			mangaId,
			chapterId
		);

		if (pages === undefined) return chapterNotFound(response);

		return response.status(200).json(pages);
	},
};
