import { Router } from "express";

import UserController from "../../controllers/users";

const routes = Router();

const routePrefix = "/users/";

routes.get(routePrefix, UserController.index);
routes.get(routePrefix+":id", UserController.show);
routes.post(routePrefix, UserController.create);

export default routes;
