import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import youtubeRoutes from "./routes/youtubeRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

app.use("/auth", authRoutes);
app.use("/youtube", youtubeRoutes);

app.get("/health", (req, res) => res.json({ status: "OK" }));

export default app;
