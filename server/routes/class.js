import express from "express";

import {
  getAllCourse,
  addCourse,
  deleteCourse,
  generate,
} from "../controllers/class.js";

const router = express.Router();

router.get("/:id", getAllCourse);
router.get("/tt/:id", generate);
router.post("/:id", addCourse);
router.delete("/:studentId/:courseId", deleteCourse);

export default router;
