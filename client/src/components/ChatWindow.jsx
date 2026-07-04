import { useEffect, useState, useRef } from "react";
import {
  getMessages,
  getLastSeen,
} from "../services/api";
import socket from "../socket";
import {  deleteMessage } from "../services/api";
import {  editMessage } from "../services/api";

export default function ChatWindow({
  selectedChat,
  messages,
  setMessages,
  onlineUsers,
}) {

    const [typing, setTyping] = useState(false);
    const [lastSeen, setLastSeen] = useState(null);
    const messagesEndRef = useRef(null);


     const fetchMessages = async () => {
    try {
      const data = await getMessages(selectedChat._id);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if (!selectedChat) return;

  fetchMessages();

  socket.emit("join chat", selectedChat._id);

}, [selectedChat]);

useEffect(() => {

  socket.on("message received", (newMessage) => {

    if (
      selectedChat &&
      newMessage.chat._id === selectedChat._id
    ) {
      setMessages((prev) => [...prev, newMessage]);
    }

  });

  return () => {
    socket.off("message received");
  };

}, [selectedChat]);

useEffect(() => {
 socket.on("typing", () => {
  

  setTyping(true);
});

  socket.on("stop typing", () => {
  
  setTyping(false);
});

  return () => {
    socket.off("typing");
    socket.off("stop typing");
  };
}, []);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

 



 const otherUser =
  !selectedChat?.isGroupChat &&
  selectedChat?.users?.find(
    (u) =>
      u._id !== JSON.parse(localStorage.getItem("user"))._id
  );

const isOnline =
  otherUser && onlineUsers?.includes(otherUser._id);

useEffect(() => {
  if (!otherUser || isOnline) return;

  if (!otherUser) return;

  const loadLastSeen = async () => {
    try {
      const data = await getLastSeen(otherUser._id);
      setLastSeen(data.lastSeen);
    } catch (err) {
      console.log(err);
    }
  };

  loadLastSeen();
}, [isOnline]);

  if (!selectedChat) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          background: "#1e1e1e",
        }}
      >
        <h2>Select a chat</h2>
      </div>
    );
  }

  const handleDelete = async (id) => {
  try {
    await deleteMessage(id);

    setMessages((prev) =>
      prev.filter((msg) => msg._id !== id)
    );
  } catch (err) {
    console.log(err);
  }
};

const handleEdit = async (msg) => {
  const newContent = prompt("Edit message", msg.content);

  if (!newContent || newContent === msg.content) return;

  try {
    const updated = await editMessage(msg._id, newContent);

    setMessages((prev) =>
      prev.map((m) =>
        m._id === updated._id ? updated : m
      )
    );
  } catch (err) {
    console.log(err);
  }
};

 

  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        background: "#1e1e1e",
        color: "white",
        overflowY: "auto",
        display: "flex",
        flexDirection:"column",
      }}
    >
     <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    borderBottom: "1px solid #444",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >
    <img
    src={
  selectedChat.isGroupChat
    ? "https://cdn-icons-png.flaticon.com/512/681/681494.png"
    : otherUser?.avatar
}
      alt=""
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />

    <div>
      <h3 style={{ margin: 0 , fontSize: "22px", }}>
       {selectedChat.isGroupChat
  ? selectedChat.chatName
  : otherUser?.name}
      </h3>

<small style={{ color: "#aaa" }}>
  {typing
    ? "Typing..."
    : selectedChat.isGroupChat
    ?  `${selectedChat?.users?.length || 0} members`
    : isOnline
    ? "🟢 Online"
    : lastSeen
    ? `Last seen at ${new Date(lastSeen).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}`
    : "Offline"}
</small>

    </div>
  </div>
</div>
      
      <p style={{ color: "yellow" }}>
  
</p>

      {typing && (
  <p
    style={{
      color: "green",
      marginTop: "10px",
      fontWeight: "bold",
    }}
  >
    Typing...
  </p>
)}

     <div
  style={{
    flex: 1,
    overflowY: "auto",
    paddingRight: "10px",
  }}
>
  {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
       messages.map((msg) => {
  const myId = JSON.parse(localStorage.getItem("user"))._id;
  const isMine = msg.sender._id === myId;

  return (
    <div
      key={msg._id}
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          position : "relative",
          maxWidth: "70%",
          background: isMine ? "#0b93f6" : "#243b55",
          padding: "14px",
          borderRadius: "18px",
          color: "white",
        }}
      >
       {selectedChat.isGroupChat && !isMine && (
  <div
    style={{
      fontSize: "13px",
      color: "#90cdf4",
      fontWeight: "bold",
      marginBottom: "5px",
    }}
  >
    {msg.sender.name}
  </div>
)}

        {msg.content.startsWith("https://res.cloudinary.com") ||
        msg.content.startsWith("https://") ? (
          <img
            src={msg.content}
            alt="sent"
            style={{
              maxWidth: "250px",
              borderRadius: "10px",
            }}
          />
        ) : (
          <div>{msg.content}</div>
        )}

{isMine && (
  <button
    onClick={() => handleEdit(msg)}
    style={{
      position: "absolute",
      top: "5px",
      right: "30px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "white",
      fontSize: "14px",
    }}
  >
    ✏️
  </button>
)}

{isMine && (
  <button
    onClick={() => handleDelete(msg._id)}
    style={{
      position: "absolute",
      top: "5px",
      right: "5px",
      background: "transparent",
      border: "none",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
    }}
  >
    🗑️
  </button>
)}

     <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "6px",
    marginTop: "6px",
    fontSize: "10px",
    opacity: 0.8,
    color: "#ddd",
  }}
>
  <span>
    {new Date(msg.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>

  {isMine && (
    <span
      style={{
        color: msg.seen ? "#4FC3F7" : "#ccc",
        fontWeight: "bold",
      }}
    >
      {msg.seen ? "✓✓" : "✓"}
    </span>
  )}
</div>

      </div>
    </div>
  );
})



      )}
      
      </div>

      <div ref={messagesEndRef}></div>
    </div>
  );
}