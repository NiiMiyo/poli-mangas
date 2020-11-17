const chapterPrefix = "Capítulo #";

export function DomToChapterResponse(dom: Element): MangaYabuChapterResponse {
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

export function DomToChapterImages(dom: Element): string[] {
	const img = dom.getElementsByTagName("img");

	const images: string[] = [];

	for (let i = 0; i < img.length; i++) {
		const element = img[i];
		images.push(element.src);
	}

	return images;
}
