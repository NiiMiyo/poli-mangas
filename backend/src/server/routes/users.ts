import { Router } from "express";
import multer from "multer";

import profilePictureUploadConfigs from "../../configs/profilePicture";

import UserController from "../../controllers/users";

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

routes.patch(
	routePrefix,
	upload.single("new_profile_picture"),
	UserController.patch
);

routes.put(routePrefix + "library", UserController.addFav);

routes.delete(routePrefix + "library", UserController.removeFav);

export default routes;
