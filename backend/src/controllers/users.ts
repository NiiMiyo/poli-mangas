import { Request, Response } from "express";
import { getRepository } from "typeorm";

import * as yup from "yup";

import UserModel from "../database/models/user";
import UserViews from "../views/UserViews";
import { userCreated } from "../server/routes/responses";

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
		const { id, password, email } = request.body;

		const userRepo = getRepository(UserModel);

		const profile_picture = request.file;

		const profilePicturePath =
			profile_picture !== undefined ? profile_picture.filename : "undefined";

		const userData = {
			id,
			password,
			email,
			library: "[]",
			profile_picture: profilePicturePath,
		};

		const validationSchema = yup.object().shape({
			id: yup.string().required(),
			password: yup.string().required(),
			email: yup.string().email().required(),
			profile_picture: yup.string(),
		});

		await validationSchema.validate(userData, {
			abortEarly: false,
		});

		const users = await userRepo.find();

		let hasConflict = false;
		const conflicts: string[] = [];

		for (let i = 0; i < users.length; i++) {
			const u = users[i];
			if (u.id === id) {
				hasConflict = true;
				conflicts.push("Username already in use");
			}
			if (u.email === email) {
				hasConflict = true;
				conflicts.push("Email already registered");
			}
		}

		if (hasConflict) {
			return response.status(409).json({
				conflicts,
				statusCode: 409,
			});
		}

		const user = userRepo.create(userData);
		await userRepo.save(user);
		return userCreated(response, user);
	},
};
