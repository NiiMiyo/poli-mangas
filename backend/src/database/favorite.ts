export default class Favorite {
	constructor(public connectorId: string, public mangaId: string) {}
	render(): string {
		return JSON.stringify(this.renderJson());
	}

	renderJson() {
		const { connectorId, mangaId } = this;

		return {
			connectorId,
			mangaId,
		};
	}
}
