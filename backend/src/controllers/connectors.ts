import { Request, Response } from "express";

import connectionService from "../server/service";

export default {
	async show(request: Request, response: Response) {
		const connectors = connectionService.getConnectorList();

		return response.status(200).json(connectors);
	},
};
