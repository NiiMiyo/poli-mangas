import { Repository } from "typeorm";
import UserModel from "../../database/models/user";

import * as yup from "yup";

const bannedUserNames = ["undefined"];

async function validateUser(
	user: UserModel,
	repo: Repository<UserModel>
): Promise<string[]> {
	const validationSchema = yup.object().shape({
		id: yup.string().required(),
		password: yup.string().required(),
		email: yup.string().email().required(),
		profile_picture: yup.string(),
	});

	await validationSchema.validate(user, {
		abortEarly: false,
	});

	const conflicts: string[] = [];

	const users = await repo.find();

	if (bannedUserNames.includes(user.id.toLowerCase())) {
		conflicts.push("Invalid username");
	}

	for (let i = 0; i < users.length; i++) {
		const u = users[i];
		if (u.id === user.id) {
			conflicts.push("Username already in use");
		}
		if (u.email === user.email) {
			conflicts.push("Email already registered");
		}
	}

	return conflicts;
}

export default validateUser;
