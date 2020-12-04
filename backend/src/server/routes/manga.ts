import { Router } from "express";

import ConnectorsController from "../../controllers/connectors";
import MangasController from "../../controllers/mangas";
import ChaptersController from "../../controllers/chapters";

import connectionService from "../../services/connectionService";

const routes = Router();

const mangaConnectionPrefix = "/connect";

routes.get(mangaConnectionPrefix, ConnectorsController.show);

routes.get(mangaConnectionPrefix + "/:connectorId/", MangasController.show);

routes.get(
	mangaConnectionPrefix + "/:connectorId/:mangaId",
	MangasController.index
);

routes.get(
	mangaConnectionPrefix + "/:connectorId/:mangaId/:chapterId",
	ChaptersController.index
);

routes.get("/mangas", async (request, response) => {
	const mangas = await connectionService.getMangaList();
	return response.status(200).json(mangas);
});

routes.get("/search", async (request, response) => {
	const searchQuery = request.query.q as string;

	const mangas = await connectionService.searchManga(searchQuery);

	return response.status(200).json(mangas);
});

export default routes;
