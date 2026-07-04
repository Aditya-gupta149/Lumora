import Chat from "../models/Chat.js";

export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    let chat = await Chat.findOne({
      isGroupChat: false,
      users: {
        $all: [req.user._id, userId],
      },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (chat) {
      return res.json(chat);
    }

    chat = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    chat = await Chat.findById(chat._id).populate(
      "users",
      "-password"
    );

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { chatName, users } = req.body;

    if (!chatName || !users) {
      return res.status(400).json({
        message: "Please provide group name and users",
      });
    }

    if (users.length < 2) {
      return res.status(400).json({
        message: "Select at least 2 users",
      });
    }

    const groupUsers = [...users, req.user._id];

    let groupChat = await Chat.create({
      chatName,
      users: groupUsers,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    groupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(201).json(groupChat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          users: userId,
        },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: {
          users: userId,
        },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};