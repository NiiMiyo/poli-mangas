import { config, DotenvParseOutput } from "dotenv";
import { join as joinpath } from "path";
import fetch from "node-fetch";

function fullPath(path: string[]): string {
	let fullpath = "";
	path.forEach((p) => {
		fullpath = joinpath(fullpath, p);
	});

	return fullpath;
}

export function loadEnv(...path: string[]): DotenvParseOutput {
	const fullpath = fullPath(path);
	return config({ path: fullpath }).parsed as DotenvParseOutput;
}

export async function fetchJson(url: string): Promise<any> {
	const response = await fetch(url);
	const json = await response.json();

	return json;
}
