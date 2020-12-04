import app from "./src/server/server";
import { loadEnv } from "./src/generics";

const { PORT, NODE_ENV } = loadEnv(__dirname, ".env");

import connection from "./src/database/connection";

app.listen(PORT, async () => {
	await connection;
	console.log(
		`CORS-enabled server is now running in ${NODE_ENV} on port ${PORT}`
	);
});
