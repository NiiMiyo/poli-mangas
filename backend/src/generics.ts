import { config, DotenvParseOutput } from "dotenv";
import { join as joinpath } from "path";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

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

export async function fetchDom(url: string) {
	const response = await fetch(url);
	const text = await response.text();

	const dom = new JSDOM(text);
	return dom;
}
