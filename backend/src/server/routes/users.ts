import { Router } from "express";
import multer from "multer";

import profilePictureUploadConfigs from "../../configs/profilePicture";

import UserController from "../../controllers/users/users";

const routes = Router();
const upload = multer(profilePictureUploadConfigs);

const routePrefix = "/users/";

routes.get(routePrefix, UserController.index);
routes.get(routePrefix + ":id", UserController.show);

routes.post(
	routePrefix,
	upload.single("profile_picture"),
	UserController.create
);

export default routes;
