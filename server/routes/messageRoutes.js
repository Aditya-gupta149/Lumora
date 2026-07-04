import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  sendMessage,
  allMessages,
} from "../controllers/messageController.js";
import { deleteMessage } from "../controllers/messageController.js";
import { editMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);

router.get("/:chatId", protect, allMessages);
router.delete("/:id", protect, deleteMessage);
router.put("/:id", protect, editMessage);

export default router;