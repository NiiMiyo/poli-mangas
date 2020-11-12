import Connector from "../connectors/connector";
import mangayabu from "../connectors/mangayabu/mangayabu";

class MangaHandler {
	private connectors: Connector[];

	constructor(...connectors: Connector[]) {
		this.connectors = connectors;
	}

	getConnector(id: string): Connector | undefined {
		let rightConnector;
		this.connectors.forEach((connector) => {
			if (connector.id == id) {
				rightConnector = connector;
			}
		});

		return rightConnector;
	}
}

const handler = new MangaHandler(mangayabu);

export default handler;
