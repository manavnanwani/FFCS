import express from "express";

import { getCourse } from "../controllers/classes.js";

const router = express.Router();

router.get("/:id", getCourse);

export default router;
