import { Router } from "express";
import {
  deleteProfileImage,
  getUserInfo,
  login,
  signup,
  updateProfile,
  updateProfileImage,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user_info", verifyToken, getUserInfo);
authRoutes.post("/update_profile", verifyToken, updateProfile);
authRoutes.post(
  "/update_profile_image",
  verifyToken,
  upload.single("profileimage"),
  updateProfileImage
);
authRoutes.delete("/delete_profile_image", verifyToken, deleteProfileImage);

export default authRoutes;
