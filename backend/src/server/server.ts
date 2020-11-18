import express from "express";
import cors from "cors";

import routes from "./routes/mangaRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.set("json spaces", 2);

app.use(routes);

export default app;
