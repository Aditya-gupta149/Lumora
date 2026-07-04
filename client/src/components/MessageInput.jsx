import { useState, useRef } from "react";
import { sendMessage } from "../services/api";
import socket from "../socket";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({
  selectedChat,
  messages,
  setMessages,
}) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSend = async () => {
    if (!selectedChat) {
      alert("Select a chat first");
      return;
    }

    if (message.trim() === "") return;

    try {
  const newMessage = await sendMessage(selectedChat._id, message);

// Instantly update the UI
setMessages((prev) => [...prev, newMessage]);

// Send to Socket.IO
socket.emit("new message", newMessage);
socket.emit("stop typing", selectedChat._id);

// Clear input
setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

 const handleTyping = (e) => {
  setMessage(e.target.value);

  if (!selectedChat) return;
  
  console.log("Sending typing");
  socket.emit("typing", selectedChat._id);

  clearTimeout(window.typingTimeout);

  window.typingTimeout = setTimeout(() => {
    socket.emit("stop typing", selectedChat._id);
  }, 1000);
}; 

const onEmojiClick = (emojiData) => {
  setMessage((prev) => prev + emojiData.emoji);
  setShowEmoji(false);
};

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "x8rvkfcu");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ot8xothy/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const img = await res.json();

    const newMessage = await sendMessage(
      selectedChat._id,
      img.secure_url
    );

    setMessages((prev) => [...prev, newMessage]);

    socket.emit("new message", newMessage);
  } catch (err) {
    console.log(err);
  }
};

 return (
  <>
    {showEmoji && (
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          left: "555px",
          zIndex: 9999,
        }}
      >
        <EmojiPicker onEmojiClick={onEmojiClick} />
      </div>
    )}

    <div
      style={{
        padding: "15px",
        borderTop: "1px solid gray",
        display: "flex",
        position:"relative",
      }}
    >
      <button
  onClick={() => fileInputRef.current.click()}
  style={{
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "none",
    marginRight: "8px",
    cursor: "pointer",
    fontSize: "20px",
    background: "#2d3748",
    color: "white",
  }}
>
  🖼️
</button>

      <button
        onClick={() => setShowEmoji(!showEmoji)}
        style={{
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  border: "none",
  marginRight: "8px",
  cursor: "pointer",
  fontSize: "22px",
  background: "#2d3748",
  color: "white",
}}
      >
        😊
      </button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />

      <input
        value={message}
        onChange={handleTyping}
        placeholder="Type message..."
        style={{
  flex: 1,
  padding: "14px",
  borderRadius: "25px",
  border: "1px solid #444",
  outline: "none",
  fontSize: "15px",
  background: "#2d3748",
  color: "white",
}}
      />

      <button
  onClick={handleSend}
  style={{
    marginLeft: "10px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "#0b93f6",
    color: "white",
    fontSize: "22px",
    cursor: "pointer",
    transition: "0.3s",
  }}
>
  ➤
</button>
    </div>
  </>
);
}