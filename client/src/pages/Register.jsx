import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
      avatar,
    });

    localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "user",
  JSON.stringify({
    _id: res.data._id,
    name: res.data.name,
    email: res.data.email,
     avatar: res.data.avatar,
  })
);

    navigate("/chat");
  } catch (err) {
    alert(err.response?.data?.message || "Registration Failed");
  }
};
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "12px",
          background: "#1e293b",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}> Register</h1>

        <input
          type="text"
          placeholder="Name"
           value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
           value={email}
  onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <input
  type="text"
  placeholder="Avatar Image URL"
  value={avatar}
  onChange={(e) => setAvatar(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "15px",
  }}
/>

        <input
          type="password"
          placeholder="Password"
           value={password}
  onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

       <button
  onClick={handleRegister}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    cursor: "pointer",
  }}
>
  Register
</button>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;