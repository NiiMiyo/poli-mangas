import express from "express";
import cors from "cors";

import mangaRoutes from "./routes/manga";
import generalRoutes from "./routes/api";
import usersRoutes from "./routes/users";

const app = express();
app.use(cors());

app.use(express.json());
app.set("json spaces", 2);

app.use(mangaRoutes);
app.use(generalRoutes);
app.use(usersRoutes);

export default app;
