import { Request, Response } from "express";
import { getRepository } from "typeorm";

import UserModel from "../../database/models/user";
import UserViews from "../../views/UserViews";
import { userCreated } from "../../server/routes/responses";
import Hash from "../../crypto/hash";
import validateUser from "./validateUser";

export default {
	async index(request: Request, response: Response) {
		const userRepo = getRepository(UserModel);

		const users = await userRepo.find();

		return response.status(200).json(UserViews.renderMany(users));
	},

	async show(request: Request, response: Response) {
		const { id } = request.params;

		const userRepo = getRepository(UserModel);
		try {
			const user = await userRepo.findOneOrFail(id);
			return response.status(200).json(UserViews.render(user));
		} catch (err) {
			return response.status(404).json({
				message: "User not found",
				statusCode: 404,
			});
		}
	},

	async create(request: Request, response: Response) {
		let { id, password, email } = request.body;

		id = id.trim();
		password = Hash.hash(password.trim());
		email = email.trim();

		const profile_picture = request.file;
		const profilePicturePath =
			profile_picture !== undefined
				? profile_picture.filename
				: "undefined";

		const userData = {
			id,
			password,
			email,
			library: "[]",
			profile_picture: profilePicturePath,
		};

		const userRepo = getRepository(UserModel);
		const user = userRepo.create(userData);

		const conflicts = await validateUser(user, userRepo);

		if (conflicts.length > 0) {
			return response.status(409).json({
				conflicts,
				statusCode: 409,
			});
		}

		await userRepo.save(user);
		return userCreated(response, user);
	},
};
