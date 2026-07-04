import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { createChat , getChats } from "../services/api";
import socket from "../socket";
import GroupChat from "./GroupChat";
import { decryptMessage } from "../utils/encryption";

export default function Sidebar({
  selectedChat,
  setSelectedChat,
}) {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [showGroup, setShowGroup] = useState(false);
  const [search, setSearch] = useState("");
  

  const fetchChats = async () => {
  try {
    const data = await getChats();
    setChats(data);
  } catch (err) {
    console.log(err);
  }
};

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchChats();
  }, []);

  useEffect(() => {
  socket.on("online users", (users) => {
    setOnlineUsers(users);
  });

  return () => {
    socket.off("online users");
  };
}, []);

  const openChat = async (userId) => {
  try {
    const chat = await createChat(userId);
     console.log(chat);
    setSelectedChat(chat);
    fetchChats();

   
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div
      style={{
        width: "300px",
        background: "#16213e",
        color: "white",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <h2>Chats</h2>

     <button
  onClick={() => setShowGroup(true)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  + New Group
</button>

<input
  type="text"
  placeholder="Search chats..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  marginBottom: "18px",
  background: "#2d3748",
  color: "white",
  outline: "none",
}}
/>

{search.trim() !== ""
  ? users
      .filter((user) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        return (
          user._id !== currentUser._id &&
          user.name.toLowerCase().includes(search.toLowerCase())
        );
      })
      .map((user) => (
        <div
          key={user._id}
          onClick={() => openChat(user._id)}
          style={{
            padding: "12px",
            marginTop: "10px",
            background: "#243b55",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={user.avatar || "https://i.pravatar.cc/40"}
                alt="avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <h4 style={{ margin: 0 }}>{user.name}</h4>
            </div>

            {onlineUsers.includes(user._id) && (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "lime",
                }}
              />
            )}
          </div>
        </div>
      ))
  : chats
      .filter((chat) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        const otherUser = chat.users.find(
          (u) => u._id !== currentUser._id
        );

        const name = chat.isGroupChat
          ? chat.chatName
          : otherUser?.name || "";

        return name
          .toLowerCase()
          .includes(search.toLowerCase());
      })
      .map((chat) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        const otherUser = chat.users.find(
          (u) => u._id !== currentUser._id
        );

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            style={{
              padding: "12px",
              marginTop: "10px",
              background:
                selectedChat?._id === chat._id
                  ? "linear-gradient(90deg,#0ea5e9,#3b82f6)"
                  : "#243b55",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.25s ease",
              boxShadow:
                selectedChat?._id === chat._id
                  ? "0 0 12px rgba(59,130,246,0.6)"
                  : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={
                    chat.isGroupChat
                      ? "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                      : otherUser?.avatar ||
                        "https://i.pravatar.cc/40"
                  }
                  alt="avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <h4 style={{ margin: 0 }}>
                    {chat.isGroupChat
                      ? `👥 ${chat.chatName}`
                      : otherUser?.name}
                  </h4>

                  {chat.latestMessage && (
                    <p
                      style={{
                        margin: 0,
                        marginTop: "5px",
                        color: "#ddd",
                        fontSize: "13px",
                      }}
                    >
                     {decryptMessage(chat.latestMessage.content)}
                    </p>
                  )}
                </div>
              </div>

              {!chat.isGroupChat &&
                onlineUsers.includes(otherUser?._id) && (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "lime",
                    }}
                  />
                )}
            </div>
          </div>
        );
      })}

{showGroup && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        width: "400px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <GroupChat
        users={users}
        fetchUsers={fetchUsers}
        fetchChats={fetchChats}
        onClose={() => setShowGroup(false)}
      />

      <button
        onClick={() => setShowGroup(false)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}