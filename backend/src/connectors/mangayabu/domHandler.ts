// import { Chapter } from "../manga";

const chapterPrefix = "Capítulo #";

export function DomToChapterResponse(dom: Element): MangaYabuChapterResponse {
	//div a "Capítulo #XXX"
	const a = dom.getElementsByTagName("a")[0];

	let chapterId = a.innerHTML;
	chapterId = chapterId.slice(chapterPrefix.length);

	const chapterLink = a.href;

	const chapter: MangaYabuChapterResponse = {
		id: chapterId,
		link: chapterLink,
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
