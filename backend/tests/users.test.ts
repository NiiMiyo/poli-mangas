process.env.NODE_ENV = "test";

import connection from "../src/database/connection";

import app from "../src/server/server";

import supertest from "supertest";

describe("User sign-up", () => {
	beforeAll(async () => {
		return new Promise<void>(async (resolve) => {
			await connection;
			resolve();
		});
	});

	beforeEach(async () => {
		return new Promise<void>(async (resolve) => {
			// Waiting connection with DB
			const c = await connection;
			await c.undoLastMigration();
			await c.runMigrations({ transaction: "all" });

			// Mocking Date.now()
			jest.spyOn(global.Date, "now").mockReturnValue(
				12345678
			);

			resolve();
		});
	});

	afterEach(() => {
		// Restoring Date.now()
		jest.spyOn(global.Date, "now").mockRestore();
	});

	test("Correct User sign-up", async (done) => {
		const userData = {
			id: "foo",
			email: "foo@example.com",
			password: "12345678",
		};

		const response = await supertest(app)
			.post("/users")
			.field(userData)
			.attach(
				"profile_picture",
				`${__dirname}/img/10509135.jpg`
			);

		const expectedResponse = {
			message: "User created successfully",
			statusCode: 201,
			user: {
				id: "foo",
				email: "foo@example.com",
				favorites: [],
				profile_picture:
					"http://localhost:3333/uploads/profilePictures/12345678-foo.jpg",
			},
		};

		expect(response.body).toEqual(expectedResponse);
		done();
	});

	test("User sign-up with no ID", async (done) => {
		const userData = {
			// id: "foo",
			email: "foo@example.com",
			password: "12345678",
		};

		const response = await supertest(app)
			.post("/users")
			.field(userData)
			.attach(
				"profile_picture",
				`${__dirname}/img/10509135.jpg`
			);

		const jsonResponse = JSON.parse(response.text);

		const expectedResponse = {
			message: "Validation error",
			errors: {
				id: ["id is a required field"],
			},
			statusCode: 400,
		};

		expect(jsonResponse).toEqual(expectedResponse);
		done();
	});

	test("User sign-up with no email", async (done) => {
		const userData = {
			id: "foo",
			// email: "foo@example.com",
			password: "12345678",
		};

		const response = await supertest(app)
			.post("/users")
			.field(userData)
			.attach(
				"profile_picture",
				`${__dirname}/img/10509135.jpg`
			);

		const jsonResponse = JSON.parse(response.text);

		const expectedResponse = {
			message: "Validation error",
			errors: {
				email: ["email is a required field"],
			},
			statusCode: 400,
		};

		expect(jsonResponse).toEqual(expectedResponse);
		done();
	});

	test("User sign-up with no password", async (done) => {
		const userData = {
			id: "foo",
			email: "foo@example.com",
			// password: "12345678",
		};

		const response = await supertest(app)
			.post("/users")
			.field(userData)
			.attach(
				"profile_picture",
				`${__dirname}/img/10509135.jpg`
			);

		const jsonResponse = JSON.parse(response.text);

		const expectedResponse = {
			message: "Validation error",
			errors: {
				password: ["password is a required field"],
			},
			statusCode: 400,
		};

		expect(jsonResponse).toEqual(expectedResponse);
		done();
	});

	test("User sign-up with no profile picture", async (done) => {
		const userData = {
			id: "foo",
			email: "foo@example.com",
			password: "12345678",
		};

		const response = await supertest(app)
			.post("/users")
			.field(userData);
		// .attach("profile_picture", `${__dirname}/img/10509135.jpg`);

		const jsonResponse = JSON.parse(response.text);

		const expectedResponse = {
			message: "User created successfully",
			statusCode: 201,
			user: {
				id: "foo",
				email: "foo@example.com",
				favorites: [],
				profile_picture:
					"http://localhost:3333/uploads/profilePictures/undefined",
			},
		};

		expect(jsonResponse).toEqual(expectedResponse);
		done();
	});

	// TODO: User sign-up with ID already in use
	// TODO: User sign-up with email already in use
});
