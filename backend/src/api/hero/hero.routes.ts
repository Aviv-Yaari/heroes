import express from "express";

import { getAll, getById, add } from "./hero.controller";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", add);

export default router;
