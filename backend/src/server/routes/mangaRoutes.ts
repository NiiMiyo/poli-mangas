import { Router } from "express";

import service from "../service";

import { connectorNotFound, mangaNotFound, chapterNotFound } from "./notFound";

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

		const mangas = await service.getMangaList(connectorId);

		if (mangas === undefined) return connectorNotFound(response);

		return response.status(200).json(mangas);
	}
);

routes.get(
	mangaConnectionPrefix + "/:connectorId/:mangaId",
	async (request, response) => {
		const { connectorId, mangaId } = request.params;

		const manga = await service.getManga(connectorId, mangaId);

		if (manga === undefined) return mangaNotFound(response);

		return response.status(200).json(manga);
	}
);

routes.get(
	mangaConnectionPrefix + "/:connectorId/:mangaId/:chapterId",
	async (request, response) => {
		const { connectorId, mangaId, chapterId } = request.params;

		const pages = await service.getChapterPages(
			connectorId,
			mangaId,
			chapterId
		);

		if (pages === undefined) return chapterNotFound(response);

		return response.status(200).json(pages);
	}
);

export default routes;
