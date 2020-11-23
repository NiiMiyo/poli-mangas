import UserModel from "../database/models/user";
import { loadEnv } from "../generics";

const { PORT } = loadEnv(__dirname, "../../.env");

export default {
	render(user: UserModel) {
		let { id, email, favorites: favArray, profile_picture } = user;

		profile_picture = `http://localhost:${PORT}/uploads/profilePictures/${profile_picture}`;

		const favorites = favArray.map((f) => f.render());

		return {
			id,
			email,
			favorites,
			profile_picture,
		};
	},

	renderMany(users: UserModel[]) {
		return users.map(this.render);
	},
};
