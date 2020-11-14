import { Response } from "express";

export function connectorNotFound(response: Response): Response {
	const statusCode = 400;
	const res = response.status(statusCode).json({
		message: "Connector not found",
		statusCode,
	});
	return res;
}

export function mangaNotFound(response: Response): Response {
	const statusCode = 400;
	return response.status(statusCode).json({
		message: "Manga not found",
		statusCode,
	});
}

export function chapterNotFound(response: Response): Response {
	const statusCode = 400;
	return response.status(statusCode).json({
		message: "Chapter not found",
		statusCode,
	});
}
