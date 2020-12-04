import { Request, Response } from "express";

import connectionService from "../services/connectionService";

export default {
	async show(request: Request, response: Response) {
		const connectors = connectionService.getConnectorList();

		return response.status(200).json(connectors);
	},
};
