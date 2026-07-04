import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        height: "60px",
        background: "#16213e",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        color: "white",
      }}
    >
      <h2>Lumora 🚀</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
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
    src={user?.avatar || "https://i.pravatar.cc/40"}
    alt="avatar"
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    }}
  />

  <span>{user?.name}</span>
</div>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}