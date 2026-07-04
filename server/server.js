import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {

    origin: [
      "https://lumora-xi-tawny.vercel.app",
      "http://localhost:5173",
    ] ,
    methods: ["GET", "POST"],
    
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New User Connected:", socket.id);



socket.on("message read", ({ chatId, messageId }) => {

    socket.to(chatId).emit("message read", {
        chatId,
        messageId,
    });

});

socket.on("send image", (imageMessage) => {

    const chat = imageMessage.chat;

    chat.users.forEach((user) => {

        if (user._id === imageMessage.sender._id) return;

        socket.to(user._id).emit("receive image", imageMessage);

    });

});

  socket.on("setup", (userData) => {

    onlineUsers.set(userData._id, socket.id);

    socket.join(userData._id);

    console.log(`${userData.name} joined with socket ${socket.id}`);

    io.emit("online users", [...onlineUsers.keys()]);

    socket.emit("connected");

});

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room:", room);
});

socket.on("typing", (room) => {
    console.log("Typing event for room:", room);
    socket.to(room).emit("typing");
});

socket.on("stop typing", (room) => {
    console.log("Stop typing:", room);
    socket.to(room).emit("stop typing");
});

socket.on("new message", (newMessage) => {

    const chat = newMessage.chat;

    if (!chat.users) return;

    chat.users.forEach((user) => {

        if (user._id === newMessage.sender._id) return;

        socket.to(user._id).emit("message received", newMessage);
    });

});


  
  socket.on("sendMessage", (message) => {
    console.log("Message:", message);

    io.emit("receiveMessage", message);
});

  socket.on("disconnect", async() => {

    for (const [userId, socketId] of onlineUsers) {

        if (socketId === socket.id) {
          await User.findByIdAndUpdate(userId, {
  lastSeen: new Date(),
});
            onlineUsers.delete(userId);
            io.emit("online users", [...onlineUsers.keys()]);
            break;
        }

    }

    io.emit("online users", [...onlineUsers.keys()]);

    console.log("User Disconnected:", socket.id);

});
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});