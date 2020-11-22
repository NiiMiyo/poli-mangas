import { Router } from "express";

const baseUrl = "http://localhost:3333/";

const routes = Router();

const apiRoutes: Route[] = [
	{
		method: "GET",
		path: baseUrl,
		example: "/",
		desc: "Retorna uma lista de rotas da API",
	},
	{
		method: "GET",
		path: baseUrl + "connect/",
		example: `${baseUrl}connect/`,
		desc: "Retorna a lista de conectores da API, com nome e ID",
	},
	{
		method: "GET",
		path: baseUrl + "connect/{connectorId}/",
		example: `${baseUrl}connect/mangayabu`,
		desc: "Retorna a lista de mangás de um conector ou erro 404",
	},
	{
		method: "GET",
		path: baseUrl + "connect/{connectorId}/{mangaId}/",
		example: `${baseUrl}connect/mangayabu/naruto`,
		desc:
			"Retorna os dados de um mangá e sua lista de capítulos (id, link) ou erro 404",
	},
	{
		method: "GET",
		path: baseUrl + "connect/{connectorId}/{mangaId}/{chapterId}/",
		example: `${baseUrl}connect/mangayabu/naruto/700`,
		desc:
			"Retorna uma lista com links para as imagens do capítulo ou erro 404",
	},
	{
		method: "GET",
		path: baseUrl + "search",
		example: `${baseUrl}search?q=naruto`,
		desc:
			"Retorna uma lista de mangás que tenham aquele termo no nome ou na sua lista de gêneros",
	},
	{
		method: "GET",
		path: baseUrl + "users/",
		example: `${baseUrl}/`,
		desc:
			"Retorna uma lista de todos os usuários cadastrados no formato: {id: string, email: string, favorites: Favorite[]}",
	},
	{
		method: "GET",
		path: baseUrl + "users/{userId}",
		example: `${baseUrl}/users/foo`,
		desc:
			"Retorna uma o usuários cadastrado com id {userId} no formato: {id: string, email: string, favorites: Favorite[]}",
	},
	{
		method: "POST",
		path: baseUrl + "users/",
		example: `${baseUrl}users/`,
		desc:
			"Recebe no body um objeto {id: string, email: string, password: string} e cria um usuário no banco de dados." +
			"Retorna um objeto {message: string, statusCode: number, user: {id: string, email: string, favorites: Favorite[]}}",
	},
];

routes.get("/", (_, response) => {
	return response.status(200).json(apiRoutes);
});

export default routes;
