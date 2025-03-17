import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mern-csv-app";

try {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
} catch (err) {
  console.error("MongoDB connection error:", err);
  process.exit(1);
}

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
