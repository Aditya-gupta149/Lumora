import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const getLastSeen = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("lastSeen");

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};