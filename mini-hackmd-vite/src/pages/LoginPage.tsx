import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/category");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ backgroundColor: "#1e3a8a", color: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1 style={{ color: "#00BFFF" }}>NoteGenius</h1>
      <input type="text" placeholder="Account" style={{ padding: "10px", margin: "10px", borderRadius: "5px", width: "200px" }} />
      <input type="password" placeholder="Password" style={{ padding: "10px", margin: "10px", borderRadius: "5px", width: "200px" }} />
      <button onClick={handleLogin} style={{ backgroundColor: "#2563eb", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", marginTop: "10px" }}>登入</button>
      <button onClick={handleRegister} style={{ backgroundColor: "#10b981", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", marginTop: "10px" }}>註冊</button>
    </div>
  );
}

export default LoginPage;
