import { Request, Response } from "express";

import UserModel from "../database/models/user";
import UserViews from "../views/UserViews";
import { userCreated } from "../server/routes/responses";

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
			return response.status(200).json(UserViews.render(user));
		} else {
			return response.status(404).json({
				message: "User not found",
				statusCode: 404,
			});
		}
	},

	async create(request: Request, response: Response) {
		let { id, password, email } = request.body;

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
};
