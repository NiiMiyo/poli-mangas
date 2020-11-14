import { Router, Response } from "express";

import connectionHandler from "./mangaHandler";

const routes = Router();

function connectorNotFound(response: Response): Response {
	const statusCode = 400;
	const res = response.status(statusCode).json({
		message: "Connector not found",
		statusCode,
	});
	return res;
}

function mangaNotFound(response: Response): Response {
	const statusCode = 400;
	return response.status(statusCode).json({
		message: "Manga not found",
		statusCode,
	});
}

function chapterNotFound(response: Response): Response {
	const statusCode = 400;
	return response.status(statusCode).json({
		message: "Chapter not found",
		statusCode,
	});
}

routes.get("/:id/", async (request, response) => {
	const { id } = request.params;

	const connector = connectionHandler.getConnector(id);

	if (!connector) {
		return connectorNotFound(response);
	}

	const mangas = await connector.getMangaList();
	const res = response.status(200).json(mangas);

	return res;
});

routes.get("/:connectorId/:manga", async (request, response) => {
	const { connectorId, manga } = request.params;

	const connector = connectionHandler.getConnector(connectorId);

	if (!connector) {
		return connectorNotFound(response);
	}

	const chapters = await connector.getChapters(manga);

	if (!chapters) {
		return mangaNotFound(response);
	}

	return response.status(200).json(chapters);
});

routes.get("/:connectorId/:mangaId/:chapterId", async (request, response) => {
	const { connectorId, mangaId, chapterId } = request.params;

	const connector = connectionHandler.getConnector(connectorId);

	if (!connector) {
		return connectorNotFound(response);
	}

	const manga = await connector.getManga(mangaId);

	if (!manga) {
		return mangaNotFound(response);
	}

	const chapter = await manga.getChapter(chapterId);

	if (!chapter) {
		return chapterNotFound(response);
	}

	let images = await chapter.getChapterImages();

	images = images.filter((link) => {
		const empty: any[] = [null, undefined];

		if (empty.includes(link)) return false;
		if (link.trim() === "") return false;

		return true;
	});

	return response.status(200).json(images);
});

export default routes;
