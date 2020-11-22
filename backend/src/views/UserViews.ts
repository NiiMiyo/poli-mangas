import UserModel from "../database/models/user";

export default {
	render(user: UserModel) {
		const { id, email, favorites: favArray } = user;

		const favorites = favArray.map((f) => f.renderJson());

		return {
			id,
			email,
			favorites,
		};
	},

	renderMany(users: UserModel[]) {
		return users.map(this.render);
	},
};
