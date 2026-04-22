import { Router } from "express";
import { signUp, logIn, changePassword, getProfile } from "../controllers/auth.controller.js";
import { signUpValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { loginLimiter } from "../middlewares/loginLimiter.js";

const router = Router()

router.post("/auth/signup", signUpValidator, validate, signUp)
router.post("/auth/login", loginLimiter, logIn)
router.put("/auth/change-password", authMiddleware, changePassword)
router.get("/auth/profile", authMiddleware, getProfile)

export const authRoutes = router