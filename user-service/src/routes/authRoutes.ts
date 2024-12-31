import express from "express";

import AuthController from "../controllers/AuthController";

const userRouter = express.Router();

userRouter.post("/register", AuthController.register);
userRouter.post("/login", AuthController.login);

export default userRouter;
