export default class Favorite {
	constructor(public connectorId: string, public mangaId: string) {}
	stringfy(): string {
		return JSON.stringify(this.render());
	}

	render() {
		const { connectorId, mangaId } = this;

		return {
			connectorId,
			mangaId,
		};
	}
}
