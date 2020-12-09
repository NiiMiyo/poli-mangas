import User from "../database/models/user";

export namespace UserTypes {
	type SignUpData = {
		id: string;
		password: string;
		email: string;

		profile_picture: Express.Multer.File;
	};

	type PatchRequest = {
		id: string;
		password: string;

		new_password?: string;
		new_email?: string;
		new_profile_picture?: Express.Multer.File;
	};

	type LoginData = {
		id: string;
		password: string;
	};
}

export namespace UserServiceResponses {
	type Register = {
		ok: boolean;
		conflicts: string[];
		user?: User;
	};

	type Patch = {
		ok: boolean;
		conflicts: string;
		user?: User;
	};
}

export namespace LibraryTypes {
	type PatchFavoriteRequest = {
		id: string;
		password: string;

		connectorId: string;
		mangaId: string;
	};

	type PatchFavoriteResponse = {
		ok: boolean;
		conflicts: string;
	};
}
