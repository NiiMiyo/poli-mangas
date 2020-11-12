import { fetchJson, loadEnv } from "../../generics";
import Connector, { ConnectorProperties, Manga } from "../connector";

// Vai carregar os dados do arquivo .env
// O arquivo DEVE terminar com .env
const { API_URL } = loadEnv(__dirname, "connector.env.example");

// Exemplo de retorno do mangá pela API
interface ExampleApiReturn {
	id: number;
	title: string;
	genre: string[];
}

// Exemplo de Conector
// Deve extender a classe Connector
class ExampleConnector extends Connector {
	constructor(props: ConnectorProperties) {
		super(props);
	}

	async getMangaList(): Promise<ExampleManga[]> {
		// Faz a requisão na API e recebe um arquivo JSON
		// O `as ExampleApiReturn[]` é pra informar o Typescript que o arquivo JSON recebido tem esse formato: Array de ExampleApiReturn
		const response = (await fetchJson(API_URL)) as ExampleApiReturn[];

		// Mapea os mangás
		const mangas = response.map((m) => {
			// Para cada mangá `m` dentro da resposta retorna um ExampleManga
			return new ExampleManga(m);
		});

		// Retorna todos os ExampleManga
		return mangas;
	}
}

// Exemplo de Mangá
// Deve extender a classe Manga
class ExampleManga extends Manga {
	constructor(props: ExampleApiReturn) {
		super({
			id: props.id.toString(),
			title: props.title,

			genre: props.genre,
			genreSeparator: " ",
		});
	}
}

// Variável do tipo ConnectorProperties com as informações sobre esse connector
const connectorProps: ConnectorProperties = {
	baseUrl: "https://example.com/",
	id: "example",
	name: "Exemplo",
};

// O conector
const connector = new ExampleConnector(connectorProps);

// Exporta o conector
export default connector;
