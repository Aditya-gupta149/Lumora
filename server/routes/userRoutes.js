import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import {
  getLastSeen,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/lastseen/:id", protect, getLastSeen);

export default router;