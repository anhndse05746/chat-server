import express from "express";

import AuthController from "../controllers/AuthController";

const authRoutes = express.Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);

export default authRoutes;
