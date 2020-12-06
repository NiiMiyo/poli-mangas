import { Request, Response } from "express";

import connectionService from "../services/connectionService";
import { connectorNotFound, mangaNotFound } from "../server/routes/responses";

export default {
	async index(request: Request, response: Response) {
		const { connectorId, mangaId } = request.params;

		const manga = await connectionService.getManga(
			connectorId,
			mangaId
		);

		if (manga === undefined) return mangaNotFound(response);

		return response.status(200).json(manga);
	},

	async show(request: Request, response: Response) {
		const { connectorId } = request.params;
		const mangas = await connectionService.getMangaList(
			connectorId
		);

		if (mangas === undefined) return connectorNotFound(response);

		return response.status(200).json(mangas);
	},
};
