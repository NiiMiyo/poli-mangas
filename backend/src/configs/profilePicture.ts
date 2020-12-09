import multer, { Options } from "multer";
import path from "path";

const env = process.env.NODE_ENV === undefined ? "dev" : process.env.NODE_ENV;

const paths = new Map<string, string>([
	[
		"dev",
		path.join(
			__dirname,
			"..",
			"..",
			"public",
			"uploads",
			"profilePictures"
		),
	],
	[
		"test",
		path.join(
			__dirname,
			"..",
			"..",
			"tests",
			"uploads",
			"profilePictures"
		),
	],
]);

const options: Options = {
	storage: multer.diskStorage({
		destination: paths.get(env),
		filename: (request, file, cb) => {
			const { id } = request.body;

			const ext = file.originalname.split(".").pop();
			const extension = ext !== undefined ? `.${ext}` : "";

			const timestamp = Date.now();

			const filename = `${timestamp}-${id}${extension}`;

			cb(null, filename);
		},
	}),
};

export default options;
