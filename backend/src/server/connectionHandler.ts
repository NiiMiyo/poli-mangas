import Connector from "../connectors/connector";

import mangayabu from "../connectors/mangayabu/mangayabu";

export class ConnectionHandler {
	private connectors: Connector[];

	constructor(...connectors: Connector[]) {
		this.connectors = connectors;
	}

	get connectorList(): Connector[] {
		return this.connectors;
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

const handler = new ConnectionHandler(mangayabu);

export default handler;
