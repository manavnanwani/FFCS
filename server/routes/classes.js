import express from "express";

import { getCourse, getAllCourses } from "../controllers/classes.js";

const router = express.Router();

router.get("/:id", getCourse);
router.get("/", getAllCourses);

export default router;
