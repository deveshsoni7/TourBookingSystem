import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import experiencesRouter from "./routes/experiences.js";
import bookingsRouter from "./routes/bookings.js";
import promoRouter from "./routes/promo.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/experiences", experiencesRouter);
app.use("/bookings", bookingsRouter);
app.use("/promo", promoRouter);

app.get("/", (_, res) => {
  res.send("BookIt API is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB Error:", err));
