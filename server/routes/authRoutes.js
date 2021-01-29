import express from "express";
const router = express.Router();
import {
  loginChecker,
  registerTeacher,
  getProfile,
  updateTeacherProfile,
} from "../controllers/authController.js";
import { authorization } from "../middlewares/authMiddleware.js";

router.post("/login", loginChecker);
router.get("/profile", authorization, getProfile);
router.post("/register", registerTeacher);
router.put("/update", authorization, updateTeacherProfile);

export default router;
