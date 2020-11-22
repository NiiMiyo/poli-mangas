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

	public get favorites(): Favorite[] {
		return JSON.parse(this.library);
	}

	public set favorites(newFavorites: Favorite[]) {
		this.library = JSON.stringify(newFavorites);
	}
}
