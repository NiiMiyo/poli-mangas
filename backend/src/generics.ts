import { config, DotenvParseOutput } from "dotenv";
import { join as joinpath } from "path";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

/**
 * Recebe uma string[] e usa do path.join para uni-la em um caminho
 *
 * @param path string[] com o caminho
 * @returns Uma string com o caminho
 */
function fullPath(path: string[]): string {
	let fullpath = "";
	path.forEach((p) => {
		fullpath = joinpath(fullpath, p);
	});

	return fullpath;
}

/**
 * Recebe uma ou mais strings com o caminho para um arquivo .env
 * e retorna as variáveis contidas nele
 *
 * @param path O caminho para o arquivo .env
 * @returns As variáveis contidas no arquivo passado
 */
export function loadEnv(...path: string[]): DotenvParseOutput {
	const fullpath = fullPath(path);
	return config({ path: fullpath }).parsed as DotenvParseOutput;
}

/**
 * Recebe uma string com uma URL para buscar online
 * e retorna um objeto JSON qualquer
 *
 * @param url Uma string com a URL que será buscada
 * @returns Um objeto JSON
 */
export async function fetchJson(url: string): Promise<any> {
	url = escapeCharacters(url);
	const response = await fetch(url);
	const json = await response.json();

	return json;
}

/**
 * Recebe uma string com uma URL para buscar online
 * e retorna um objeto JSDOM
 *
 * @param url Uma string com a URL que será buscada
 * @returns Um objeto JSDOM
 */
export async function fetchDom(url: string) {
	url = escapeCharacters(url);
	const response = await fetch(url);
	const text = await response.text();

	const dom = new JSDOM(text);
	return dom;
}

/**
 * Recebe diversos parâmetros e caso o valor booleano de
 * um deles seja `false` retorna `false`
 *
 * @param comparators Os valores a serem comparados
 * @returns Uma `boolean` de acordo com os
 * valores booleandos dos `comparators`
 */
export function multipleAnd(...comparators: any[]): boolean {
	for (let i = 0; i < comparators.length; i++) {
		const b = Boolean(comparators[i]);
		if (!b) return false;
	}

	return true;
}

/**
 * Recebe diversos parâmetros e caso o valor booleano de
 * um deles seja `true` retorna `true`
 *
 * @param comparators Os valores a serem comparados
 * @returns Uma `boolean` de acordo com os
 * valores booleandos dos `comparators`
 */
export function multipleOr(...comparators: any[]): boolean {
	for (let i = 0; i < comparators.length; i++) {
		const b = Boolean(comparators[i]);
		if (b) return true;
	}
	return false;
}

/**
 * Recebe uma string[] e retorna uma cópia sem
 * elementos vazios, nulos ou indefinidos
 *
 * @param strings Array de strings a serem filtradas
 * @returns string[] sem valores vazios, nulos ou indefinidos
 */
export function filterStringArray(strings: string[]): string[] {
	const return_ = strings.filter((s) => {
		const isEmpty = [null, undefined, ""].includes(s);

		return !isEmpty;
	});
	return return_;
}

/**
 * Recebe o valor inicial e final (ambos inclusivos) de um intervalo
 * e retorna uma array de numeros daquele intervalo
 *
 * @param initial Valor inicial do intervalo
 * @param final Valor final do intervalo
 * @param step Valor de incremento do intervalo
 */
export function range(
	initial: number,
	final: number,
	step: number = 1
): number[] {
	initial = Math.floor(initial);
	final = Math.ceil(final);

	const rangeArray: number[] = [];

	const isCrescent = initial < final;

	const compareFunction = isCrescent
		? (num1: number, num2: number) => {
				return num1 <= num2;
		  }
		: (num1: number, num2: number) => {
				return num2 <= num1;
		  };

	const startPoint = isCrescent ? initial : final;
	const stopPoint = isCrescent ? final : initial;
	let value = startPoint;

	while (compareFunction(value, stopPoint)) {
		rangeArray.push(value);

		value += isCrescent ? Math.abs(step) : -Math.abs(step);
	}

	return rangeArray;
}

/**
 * Recebe uma array bidimensional genérica
 * e retorna seus valores em formato unidimensional
 *
 * @param array Array bidimensional genérica
 * @returns Array unidimensional com os valores da array bidimensional
 */
export function unarray<T>(array: T[][]): T[] {
	let onelevelArray: T[] = [];

	array.forEach((t) => {
		onelevelArray = onelevelArray.concat(t);
	});

	return onelevelArray;
}

/**
 * Recebe uma string e retorna uma cópia sem vogais ou consoantes acentuadas
 *
 * @param q String com acentos
 * @returns String sem acentos
 */
export function removeAccents(q: string): string {
	const letterMap = new Map<RegExp, string>([
		[RegExp("[àáãâä]"), "a"],
		[RegExp("[èéêä]"), "e"],
		[RegExp("[ìíîï]"), "i"],
		[RegExp("[òóôõö]"), "o"],
		[RegExp("[úùûü]"), "u"],

		[RegExp("[ñ]"), "n"],
		[RegExp("[š]"), "s"],
		[RegExp("[ç]"), "c"],
		[RegExp("[ýÿ]"), "y"],
		[RegExp("[ž]"), "z"],
	]);

	letterMap.forEach((value, key) => {
		q = q.replace(key, value);
	});

	return q;
}

/**
 * Transforma alguns caracteres em suas formas "escapadas"
 *
 * @param query String original
 * @returns String com caracteres escapados
 */
function escapeCharacters(query: string): string {
	const escapeMap = new Map([
		["&", "&"],
		["=", "="],
		["-", "-"],
	]);

	escapeMap.forEach((value, key) => {
		query = query.replace(key, value);
	});

	return query;
}
