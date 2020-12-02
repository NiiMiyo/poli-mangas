import crypto from "crypto";
import { readFileSync } from "fs";
import { join } from "path";

const KEY = readFileSync(join(__dirname, "key"));

export default {
	hash(text: string): string {
		const hashValue = crypto.createHash("sha256", KEY).update(text);
		return hashValue.digest("hex");
	},
};
