import { Router } from "express";

const baseUrl = "http://localhost:3333/";

const routes = Router();

const apiRoutes: Route[] = [
	{
		method: "GET",
		path: baseUrl,
		example: "GET /",
		desc: "Retorna uma lista de rotas da API",
	},
	{
		method: "GET",
		path: baseUrl + "connect/",
		example: `GET ${baseUrl}connect/`,
		desc: "Retorna a lista de conectores da API, com nome e ID.",
	},
];

routes.get("/", (_, response) => {
	return response.status(200).json(apiRoutes);
});

export default routes;
