import express from "express";
import cors from "cors";
import path from "path";
import "express-async-errors";

import mangaRoutes from "./routes/manga";
import usersRoutes from "./routes/users";

import errorHandler from "../errors/handler";

const app = express();
app.disable("x-powered-by");

app.use(cors());

app.use(express.json());
app.set("json spaces", 0);

app.use(mangaRoutes);
app.use(usersRoutes);

app.use(
	"/uploads",
	express.static(path.join(__dirname, "..", "..", "public", "uploads"))
);

app.use(
	"/favicon.ico",
	express.static(path.join(__dirname, "..", "..", "favicon.ico"))
);

app.use(errorHandler);

export default app;
