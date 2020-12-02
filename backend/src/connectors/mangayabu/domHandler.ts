const chapterPrefix = "Capítulo #";
/**
 * Recebe o elemento de classe `single-chapter` da página no mangá e retorna um objeto correspondente
 *
 * @param dom O elemento de classe `single-chapter`
 * @returns Um MangaYabuChapterResponse com as propriedades extraídas
 */
export function domToChapter(dom: Element): MangaYabuChapterResponse {
	const a = dom.getElementsByTagName("a")[0];

	let chapterId = a.innerHTML;
	chapterId = chapterId.slice(chapterPrefix.length);

	const title = chapterId;

	const chapter: MangaYabuChapterResponse = {
		id: chapterId,
		link: a.href,

		title,
	};

	return chapter;
}

/**
 * Recebe o elemento de classe `manga-page` da página de um capítulo e
 * retorna uma array de strings com as URLs das imagens das páginas
 *
 * @param dom Elemento de classe `manga-page`
 * @returns Uma array de strings com os links para cada imagem
 */
export function domToChapterImages(dom: Element): string[] {
	const img = dom.getElementsByTagName("img");

	const images: string[] = [];

	for (let i = 0; i < img.length; i++) {
		const element = img[i];
		images.push(element.src);
	}

	return images;
}
