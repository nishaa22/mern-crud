import express from "express";
import upload from "../middlewares/multerMiddleware.js";
import { imageUpload, uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.post("/upload/image", upload.single("image"), imageUpload)
export default router;
