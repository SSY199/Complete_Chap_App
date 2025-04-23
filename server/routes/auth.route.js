import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user_info",verifyToken, getUserInfo);

export default authRoutes;