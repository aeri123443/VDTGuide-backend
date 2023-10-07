import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/score.js";
import { isAuth } from "../middleware/user.js";

const router = express.Router();

// GET /score/:id
router.get("/:id", isAuth, tweetController.getScores);

// POST /score
router.post("/", isAuth, tweetController.createScore);

// 사용할지 안할지 미지수
// PUT /score/:id
router.put("/:id", isAuth, tweetController.updateScore);

export default router;
