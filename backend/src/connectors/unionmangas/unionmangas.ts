import { loadEnv } from "../../generics";
import { ConnectorProperties } from "../connector";

const { API_URL } = loadEnv(__dirname, "unionmangas.env");

const unionmangasProps: ConnectorProperties = {
	name: "Union Mangás",
	id: "unionmangas",

	baseUrl: "unionmangas.xyz",
};

interface UnionMangasApiResponse {
	id: string;
	name: string;
	nameOther: string | null;
	nameSeo: string;
	image: string;
	group: null;
	desc: null;
	source: null;
	statusName: string;
	statusId: null;
	strAuthor: null;
	strNameAuthor: null;
	hastag: ",popup";
	date: null;
	listGenres: {
		id: string;
		name: string;
		nameSeo: string;
		group: null;
		index: number;
	}[];
	listAuthors: {
		id: string;
		name: string;
		nameSeo: string;
		group: null;
		index: number;
	}[];
	listYear: null;
	listScan: null;
	listArt: null;
	listType: null;
	listStatus: null;
	listTranslators: null;
	listActors: null;
	listDirectors: null;
	htmlPagin: null;
	totalRecode: number;
	currentPage: number;
	totalChapter: number;
	dateLast: string;
	iD_ACTOR: null;
	iD_TYPE: null;
	iD_YEAR: null;
	reaD_VIEW: null;
	iD_DIRECTOR: null;
	iframe: null;
}

// TODO: Fazer todas as chamadas para a API em paralelo
// Não tem como puxar todos os mangás de uma vez só
