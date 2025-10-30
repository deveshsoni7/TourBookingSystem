import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import experiencesRouter from "./routes/experiences.js";
import bookingsRouter from "./routes/bookings.js";
import promoRouter from "./routes/promo.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Your existing API routes
app.use("/experiences", experiencesRouter);
app.use("/bookings", bookingsRouter);
app.use("/promo", promoRouter);

// ✅ Serve Frontend (React build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ✅ Fallback API check
app.get("/api", (_, res) => {
  res.send("BookIt API is running");
});

const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB Error:", err));
