import { createConnection } from "typeorm";

const enviroment =
	process.env.NODE_ENV === undefined ? "dev" : process.env.NODE_ENV;

const connection = createConnection(enviroment);
connection.then((c) => {
	c.runMigrations({ transaction: "all" });
});

export default connection;
