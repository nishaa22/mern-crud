import express from 'express';
import cors from "cors";
import { userRoutes } from '../routes/user.routes.js';
import { authRoutes } from '../routes/auth.routes.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import uploadRoutes from '../routes/uploadRoutes.js';

const app = express();

// handles CORS issues
app.use(cors(
    { origin: '*' }
));

// middleware to parse JSON bodies
app.use(express.json())

// account routes
app.use("/", authRoutes);

// user routes
app.use("/", authMiddleware, userRoutes);

// upload routes
app.use("/", uploadRoutes);


export default app;