import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import Navbar from "../components/Navbar";

import { useEffect } from "react";
import socket from "../socket";

export default function Chat() {

  const [selectedChat, setSelectedChat] = useState(null);

  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    socket.emit("setup", user);
  }
}, []);

useEffect(() => {
  socket.on("online users", (users) => {
    setOnlineUsers(users);
  });

  return () => {
    socket.off("online users");
  };
}, []);

 return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Top Navbar */}
    <Navbar />

    {/* Main Chat Layout */}
    <div
      style={{
        flex: 1,
        display: "flex",
      }}
    >
      <Sidebar
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatWindow
  selectedChat={selectedChat}
  messages={messages}
  setMessages={setMessages}
  onlineUsers={onlineUsers}
/>

        <MessageInput
          selectedChat={selectedChat}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  </div>
);
}