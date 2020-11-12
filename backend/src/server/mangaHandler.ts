import Connector from "../connectors/connector";
import mangayabu from "../connectors/mangayabu/mangayabu";

class MangaHandler {
	private connectors: Connector[];

	constructor(...connectors: Connector[]) {
		this.connectors = connectors;
	}

	getConnector(id: string): Connector | undefined {
		for (let i = 0; i < this.connectors.length; i++) {
			const connector = this.connectors[i];
			if (connector.id == id) {
				return connector;
			}
		}

		return undefined;
	}
}

const handler = new MangaHandler(mangayabu);

export default handler;
