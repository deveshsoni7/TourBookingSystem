import express from "express";
import { listExperiences, getExperienceById } from "../controllers/experienceController.js";
const router = express.Router();
router.get("/", listExperiences);
router.get("/:id", getExperienceById);
export default router;
