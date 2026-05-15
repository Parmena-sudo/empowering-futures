import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import formRoutes from "./routes/forms.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "10kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "Empowering Futures API" }));
app.use("/api", formRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
