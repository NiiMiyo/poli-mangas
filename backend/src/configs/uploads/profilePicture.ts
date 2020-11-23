import multer, { Options } from "multer";
import path from "path";

const options: Options = {
	storage: multer.diskStorage({
		destination: path.join(
			__dirname,
			"..",
			"..",
			"..",
			"public",
			"uploads",
			"profilePictures"
		),
		filename: (request, file, cb) => {
			const { id: username } = request.body;
			const extension = file.originalname.split(".").pop();

			const filename = `${username}.${extension}`;

			cb(null, filename);
		},
	}),
};

export default options;
