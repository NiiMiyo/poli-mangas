import { Response } from "express";

import UserModel from "../../database/models/user";
import UserViews from "../../views/UserViews";

const notFoundCode = 404;
const internalErrorCode = 500;
const createdCode = 201;

export function connectorNotFound(response: Response): Response {
	const res = response.status(notFoundCode).json({
		message: "Connector not found",
		statusCode: notFoundCode,
	});
	return res;
}

export function mangaNotFound(response: Response): Response {
	return response.status(notFoundCode).json({
		message: "Manga not found",
		statusCode: notFoundCode,
	});
}

export function chapterNotFound(response: Response): Response {
	return response.status(notFoundCode).json({
		message: "Chapter not found",
		statusCode: notFoundCode,
	});
}

export function internalError(response: Response): Response {
	return response.status(internalErrorCode).json({
		message: "Internal Server Error",
		statusCode: internalErrorCode,
	});
}

export function userCreated(response: Response, user: UserModel): Response {
	const res = response.status(createdCode).json({
		message: "User created succesfully",
		statusCode: createdCode,
		user: UserViews.render(user),
	});
	return res;
}
