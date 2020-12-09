import { Entity, Column, PrimaryColumn } from "typeorm";

import Favorite from "../favorite";

@Entity("users")
export default class User {
	@PrimaryColumn()
	id: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column()
	library: string;

	@Column()
	profile_picture: string;

	public get favorites(): Favorite[] {
		const favs = JSON.parse(this.library).map(
			(f: any) => new Favorite(f.connectorId, f.mangaId)
		);

		return favs;
	}

	public set favorites(newFavorites: Favorite[]) {
		this.library = JSON.stringify(newFavorites);
	}
}
