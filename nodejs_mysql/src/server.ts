import express from "express";
import customerRoutes from "./routes/customerRoutes";
import authRoutes from "./routes/authRoutes";
import { AppDataSource } from "./ormconfig";
import dotenv from "dotenv";
import cors from "cors";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use("/customers", customerRoutes);
app.use("/auth", authRoutes);

AppDataSource.initialize().then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => console.error("Database connection failed:", error));
