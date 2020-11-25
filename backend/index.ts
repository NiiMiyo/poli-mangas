import app from "./src/server/server";
import { loadEnv } from "./src/generics";

const { PORT, ENVIROMENT } = loadEnv(__dirname, ".env");

import "./src/database/connection";

app.listen(PORT);

console.log(
	`CORS-enabled server is now running in ${ENVIROMENT} on port ${PORT}`
);
