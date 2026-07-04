import { useState } from "react";
import { createGroup } from "../services/api";

export default function GroupChat({ users, fetchUsers , fetchChats , onClose ,  }) {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelect = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleCreate = async () => {
    if (!groupName || selectedUsers.length < 2) {
      alert("Enter group name and select at least 2 users");
      return;
    }

    try {
      await createGroup(groupName, selectedUsers);
      alert("Group created!");
      if (onClose) onClose();
      if (fetchChats) fetchChats();

      setGroupName("");
      setSelectedUsers([]);

      if (fetchUsers) fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

 return (
  <div>
    <h2
      style={{
        color: "white",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Create New Group
    </h2>

    <input
      placeholder="Enter Group Name"
      value={groupName}
      onChange={(e) => setGroupName(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        marginBottom: "20px",
      }}
    />

    <div
      style={{
        maxHeight: "220px",
        overflowY: "auto",
        background: "#0f172a",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {users.map((user) => (
        <label
          key={user._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleSelect(user._id)}
          />

          <img
            src={user.avatar || "https://i.pravatar.cc/40"}
            alt=""
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          {user.name}
        </label>
      ))}
    </div>

    <button
      onClick={handleCreate}
      style={{
        width: "100%",
        marginTop: "20px",
        padding: "12px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Create Group
    </button>
  </div>
);

}