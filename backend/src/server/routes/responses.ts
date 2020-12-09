import { Response } from "express";

import UserModel from "../../database/models/user";
import UserViews from "../../views/UserViews";

const ResponseCodes = {
	NOT_FOUND: 404,
	CREATED: 201,
	OKAY: 200,
};

export function connectorNotFound(response: Response): Response {
	const res = response.status(ResponseCodes.NOT_FOUND).json({
		message: "Connector not found",
		statusCode: ResponseCodes.NOT_FOUND,
	});
	return res;
}

export function mangaNotFound(response: Response): Response {
	return response.status(ResponseCodes.NOT_FOUND).json({
		message: "Manga not found",
		statusCode: ResponseCodes.NOT_FOUND,
	});
}

export function chapterNotFound(response: Response): Response {
	return response.status(ResponseCodes.NOT_FOUND).json({
		message: "Chapter not found",
		statusCode: ResponseCodes.NOT_FOUND,
	});
}

export function userCreated(response: Response, user: UserModel): Response {
	const res = response.status(ResponseCodes.CREATED).json({
		message: "User created succesfully",
		statusCode: ResponseCodes.CREATED,
		user: UserViews.render(user),
	});
	return res;
}

export function userPatched(response: Response, user: UserModel): Response {
	const res = response.status(ResponseCodes.OKAY).json({
		message: "User patched successfully",
		statusCode: ResponseCodes.OKAY,
		user: UserViews.render(user),
	});
	return res;
}

export function addedFavorite(response: Response): Response {
	const res = response.status(ResponseCodes.OKAY).json({
		message: "Favorite added",
		statusCode: ResponseCodes.OKAY,
	});
	return res;
}

export function removedFavorite(response: Response): Response {
	const res = response.status(ResponseCodes.OKAY).json({
		message: "Favorite removed successfully",
		statusCode: ResponseCodes.OKAY,
	});
	return res;
}
