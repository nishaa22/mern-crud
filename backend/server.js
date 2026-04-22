
import dotenv from 'dotenv';
import connectDB from "./src/config/db.js";
import app from './src/config/app.js';

dotenv.config()

const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer().catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
})