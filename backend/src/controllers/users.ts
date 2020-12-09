import { Request, Response } from "express";

import UserModel from "../database/models/user";
import UserViews from "../views/UserViews";
import {
	addedFavorite,
	userCreated,
	userPatched,
	removedFavorite,
} from "../server/routes/responses";

import UserService from "../services/userService";
import fs from "fs";

export default {
	async index(request: Request, response: Response) {
		const users = await UserService.getAllUsers();
		const renderedUsers = UserViews.renderMany(users);

		return response.status(200).json(renderedUsers);
	},

	async show(request: Request, response: Response) {
		const { id } = request.params;

		const user = await UserService.findUser(id);

		if (user !== undefined) {
			return response
				.status(200)
				.json(UserViews.render(user));
		} else {
			return response.status(404).json({
				message: "User not found",
				statusCode: 404,
			});
		}
	},

	async create(request: Request, response: Response) {
		let { id, password, email } = request.body;

		id = "" + id;
		password = "" + password;

		const profile_picture = request.file;
		const requestUser = {
			id,
			password,
			email,
			profile_picture,
		};

		let { conflicts, ok, user } = await UserService.registerUser(
			requestUser
		);

		if (!ok) {
			fs.unlink(profile_picture.path, () => {});
			return response.status(409).json({
				message: "Conflic error",
				conflicts,
				statusCode: 409,
			});
		}
		user = user as UserModel;

		return userCreated(response, user);
	},

	async patch(request: Request, response: Response) {
		const { id, password, email, new_password } = request.body;
		const new_profile_picture = request.file;

		const patchedUser = {
			id,
			password,
			email,
			new_password,
			new_profile_picture,
		};

		let { ok, conflicts, user } = await UserService.patch(
			patchedUser
		);

		if (!ok) {
			if (new_profile_picture !== undefined) {
				fs.unlink(new_profile_picture.path, () => {});
			}

			return response.status(400).json({
				message: "Invalid login",
				conflicts,
				statusCode: 400,
			});
		}

		user = user as UserModel;

		return userPatched(response, user);
	},

	async addFav(request: Request, response: Response) {
		let { id, password, connectorId, mangaId } = request.body;

		id = "" + id;
		password = "" + password;

		const favoriteData = { id, password, connectorId, mangaId };

		const { ok, conflicts } = await UserService.addFavorite(
			favoriteData
		);

		if (!ok) {
			return response.status(400).json({
				message: "Favorite not added",
				conflicts,
				statusCode: 400,
			});
		}

		return addedFavorite(response);
	},

	async removeFav(request: Request, response: Response) {
		let { id, password, connectorId, mangaId } = request.body;

		id = "" + id;
		password = "" + password;

		const favoriteData = { id, password, connectorId, mangaId };

		const { ok, conflicts } = await UserService.removeFavorite(
			favoriteData
		);

		if (!ok) {
			return response.status(400).json({
				message: "Favorite not removed",
				conflicts,
				statusCode: 400,
			});
		}

		return removedFavorite(response);
	},
};
