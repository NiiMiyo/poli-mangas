import connection from "../database/connection";

import * as yup from "yup";

import UserModel from "../database/models/user";
import Hash from "../crypto/hash";

import { UserTypes, UserServiceResponses, LibraryTypes } from "./servicetypes";
import Favorite from "../database/favorite";

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
	): Promise<UserServiceResponses.Register> {
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
			password: Hash.hash(userData.password),
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

	private static async validateLogin(
		user: UserTypes.LoginData
	): Promise<boolean> {
		user.password = Hash.hash(`${user.password}`);

		const toSearch = {
			id: user.id,
			password: user.password,
		};

		const db = await connection;
		const userRepo = db.getRepository(UserModel);

		const dbUser = await userRepo.findOne(toSearch);
		return dbUser !== undefined;
	}

	static async patch(
		patchData: UserTypes.PatchRequest
	): Promise<UserServiceResponses.Patch> {
		const isValidLogin = await this.validateLogin(patchData);
		if (!isValidLogin)
			return {
				ok: false,
				conflicts: "Username and Password don't match",
			};

		const db = await connection;
		const userRepo = db.getRepository(UserModel);

		const toSearch = {
			id: patchData.id,
			password: patchData.password,
		};
		const user = await userRepo.findOneOrFail(toSearch);

		if (patchData.new_profile_picture !== undefined) {
			user.profile_picture =
				patchData.new_profile_picture.filename;
		}

		if (patchData.new_password !== undefined) {
			patchData.new_password = Hash.hash(
				patchData.new_password
			);

			user.password = patchData.new_password;
		}

		if (patchData.new_email !== undefined) {
			user.email = patchData.new_email;
		}

		await userRepo.save(user);
		return {
			ok: true,
			conflicts: "",
			user,
		};
	}

	static async addFavorite(
		favoriteData: LibraryTypes.PatchFavoriteRequest
	): Promise<LibraryTypes.PatchFavoriteResponse> {
		const isValid = await this.validateLogin(favoriteData);

		if (!isValid) {
			return {
				ok: false,
				conflicts: "Username and Password don't match",
			};
		}

		const hasConnector = favoriteData.connectorId !== undefined;
		const hasManga = favoriteData.mangaId !== undefined;

		if (!hasConnector || !hasManga) {
			return {
				ok: false,
				conflicts: "Connector or Manga not informed",
			};
		}

		const userRepo = (await connection).getRepository(UserModel);

		const user = await userRepo.findOneOrFail({
			id: favoriteData.id,
		});

		const thisFavorite = new Favorite(
			favoriteData.connectorId,
			favoriteData.mangaId
		);

		const favorites = [...user.favorites];

		let alreadyFavorite = false;
		for (let i = 0; i < favorites.length; i++) {
			const f = favorites[i];

			const equalConnector =
				f.connectorId == favoriteData.connectorId;

			const equalManga = f.mangaId == favoriteData.mangaId;

			if (equalConnector && equalManga) {
				alreadyFavorite = true;
				break;
			}
		}

		if (!alreadyFavorite) {
			favorites.push(thisFavorite);
			user.favorites = [...favorites];

			await userRepo.save(user);
		}

		return {
			ok: true,
			conflicts: "",
		};
	}
}
