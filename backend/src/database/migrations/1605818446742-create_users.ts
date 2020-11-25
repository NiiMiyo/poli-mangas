import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1605818446742 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "text",
						isPrimary: true,
						isNullable: false,
						isGenerated: false,
					},
					{
						name: "password",
						type: "text",
						isNullable: false,
						isGenerated: false,
					},
					{
						name: "email",
						type: "text",
						isUnique: true,
						isNullable: false,
						isGenerated: false,
					},
					{
						name: "library",
						type: "text",
						isNullable: false,
						isGenerated: false,
					},
					{
						name: "profile_picture",
						type: "text",
						isGenerated: false,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
