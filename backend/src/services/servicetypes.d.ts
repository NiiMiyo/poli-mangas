import User from "../database/models/user";

export namespace UserTypes {
	type SignUpData = {
		id: string;
		password: string;
		email: string;

		profile_picture: Express.Multer.File;
	};

	type RegisterReponse = {
		ok: boolean;
		conflicts: string[];
		user?: User;
	};
}
