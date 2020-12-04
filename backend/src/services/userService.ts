import connection from "../database/connection";

import * as yup from "yup";

import UserModel from "../database/models/user";
import Hash from "../crypto/hash";

import { UserTypes } from "./servicetypes";

export default abstract class UserService {
	static async getAllUsers(): Promise<UserModel[]> {
		const db = await connection;
		const userRepo = db.getRepository(UserModel);
		const users = await userRepo.find();
		return users;
	}

	static async findUser(userId: string): Promise<UserModel | undefined> {
		const db = await connection;
		const userRepo = db.getRepository(UserModel);

		const user = userRepo.findOne(userId);
		return user;
	}

	static async registerUser(
		userData: UserTypes.SignUpData
	): Promise<UserTypes.RegisterReponse> {
		const db = await connection;

		if (userData.id !== undefined) {
			userData.id = userData.id.trim();
		} else {
			userData.id = "";
		}

		if (userData.email !== undefined) {
			userData.email = userData.email.trim();
		} else {
			userData.email = "";
		}

		let picturePath;
		if (userData.profile_picture !== undefined) {
			picturePath = userData.profile_picture.filename;
		} else {
			picturePath = "undefined";
		}

		const storedUser: UserModel = {
			id: userData.id,
			email: userData.email,
			favorites: [],
			library: "[]",
			password: userData.password,
			profile_picture: picturePath,
		};

		const conflicts = await this.validateUser(storedUser);
		if (conflicts.length > 0) {
			return {
				ok: false,
				conflicts,
			};
		}

		const userRepo = db.getRepository(UserModel);
		const user = userRepo.create(storedUser);

		await userRepo.save(user);
		return {
			ok: true,
			conflicts: [],
			user,
		};
	}

	private static async validateUser(user: UserModel): Promise<string[]> {
		const db = await connection;
		const userRepo = db.getRepository(UserModel);

		const validationScheme = yup.object().shape({
			id: yup.string().required(),
			password: yup.string().required(),
			email: yup.string().email().required(),
			profile_picture: yup.string(),
		});

		await validationScheme.validate(user, { abortEarly: false });

		const [usedId, usedEmail] = await Promise.all([
			userRepo.findOne({ id: user.id }),
			userRepo.findOne({ email: user.email }),
		]);

		const conflicts: string[] = [];
		if (usedId !== undefined) {
			conflicts.push("Username already in use");
		}
		if (usedEmail !== undefined) {
			conflicts.push("Email already in use");
		}

		return conflicts;
	}
}
