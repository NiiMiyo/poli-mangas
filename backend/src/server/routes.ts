import { Router } from "express";

import handler from "./mangaHandler";

const routes = Router();

routes.get("/:id/mangas", async (request, response) => {
	const { id } = request.params;

	console.log(`Connecting to \`${id}\``);

	const connector = handler.getConnector(id);

	let __return;
	if (connector) {
		const mangas = await connector.getMangaList();
		__return = response.status(200).json(mangas);
	} else {
		const statusCode = 400;
		__return = response.status(statusCode).json({
			message: "Connector not found",
			statusCode,
		});
	}

	return __return;
});

export default routes;
