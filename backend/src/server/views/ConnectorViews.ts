import Connector from "../../connectors/connector";

export default {
	render(connector: Connector) {
		const { id, name } = connector;

		return {
			id,
			name,
		};
	},

	renderMany(connectors: Connector[]) {
		return connectors.map(this.render);
	},
};
