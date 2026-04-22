import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // only 5 login attempts
  message: "Too many login attempts. Try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});
