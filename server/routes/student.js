import express from "express";

import { signin, signup } from "../controllers/student.js";

const router = express.Router();

router.post("/", signup);
router.get("/:regNo", signin);

export default router;
