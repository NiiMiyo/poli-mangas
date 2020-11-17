import { Router } from "express";

import service from "../service";

import {
	connectorNotFound,
	mangaNotFound,
	chapterNotFound,
	internalError,
} from "./responses";

const routes = Router();

const mangaConnectionPrefix = "/connect";

routes.get(mangaConnectionPrefix, async (request, response) => {
	const connectors = service.getConnectorList();

	return response.status(200).json(connectors);
});

routes.get(
	mangaConnectionPrefix + "/:connectorId/",
	async (request, response) => {
		const { connectorId } = request.params;

		try {
			const mangas = await service.getMangaList(connectorId);

			if (mangas === undefined) return connectorNotFound(response);

			return response.status(200).json(mangas);
		} catch (err) {
			return internalError(response);
		}
	}
);

routes.get(
	mangaConnectionPrefix + "/:connectorId/:mangaId",
	async (request, response) => {
		const { connectorId, mangaId } = request.params;

		try {
			const manga = await service.getManga(connectorId, mangaId);

			if (manga === undefined) return mangaNotFound(response);

			return response.status(200).json(manga);
		} catch (error) {
			return internalError(response);
		}
	}
);

routes.get(
	mangaConnectionPrefix + "/:connectorId/:mangaId/:chapterId",
	async (request, response) => {
		const { connectorId, mangaId, chapterId } = request.params;

		try {
			const pages = await service.getChapterPages(
				connectorId,
				mangaId,
				chapterId
			);

			if (pages === undefined) return chapterNotFound(response);

			return response.status(200).json(pages);
		} catch (error) {
			return internalError(response);
		}
	}
);

export default routes;
