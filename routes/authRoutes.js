import express from "express";
import { startGoogleOAuth, handleGoogleCallback, logout, getUserInfo } from "../controllers/authController.js";

const router = express.Router();

router.get("/google", startGoogleOAuth);
router.get("/google/callback", handleGoogleCallback);
router.post("/logout", logout);
router.get("/me", getUserInfo);

export default router;
