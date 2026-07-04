import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import {
  encryptMessage,
  decryptMessage,
} from "../utils/encryption.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({
        message: "Content and Chat ID required",
      });
    }

    let message = await Message.create({
  sender: req.user._id,
  content: encryptMessage(content),
  chat: chatId,
});

    message = await message.populate("sender", "name email avatar");
    message = await message.populate("chat");

    message.content = decryptMessage(message.content);

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const allMessages = async (req, res) => {
  try {

    await Message.updateMany(
  {
    chat: req.params.chatId,
    sender: { $ne: req.user._id },
  },
  {
    seen: true,
  }
);

    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "name email avatar")
      .populate("chat");

   const decryptedMessages = messages.map((msg) => ({
  ...msg.toObject(),
  content: decryptMessage(msg.content),
}));

res.json(decryptedMessages);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const editMessage = async (req, res) => {
  try {
    const { content } = req.body;

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    message.content = encryptMessage(content);
    await message.save();
    const decryptedMessage = {
  ...message.toObject(),
  content: decryptMessage(message.content),
};

res.json(decryptedMessage);

   
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};