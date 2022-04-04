import express from "express";

import UserController from "./resources/user/user.controller";
import ServiceController from "./resources/service/service.controller";

const app = express();

const userController = new UserController()
const serviceController = new ServiceController()

app.use('/auth', userController.router)
app.use('/services', serviceController.router)

export default app;