import express from "express";
import cors from "cors";

import mangaRoutes from "./routes/mangaRoutes";
import generalRoutes from "./routes/api";

const app = express();
app.use(cors());

app.use(express.json());
app.set("json spaces", 2);

app.use(mangaRoutes);
app.use(generalRoutes);

export default app;
