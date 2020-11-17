import express from "express";
import routes from "./routes/mangaRoutes";

const app = express();

app.use(express.json());
app.set("json spaces", 2);

app.use(routes);

export default app;
