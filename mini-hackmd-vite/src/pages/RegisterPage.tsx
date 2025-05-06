import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#1e3a8a", color: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1>註冊帳號</h1>
      <input type="text" placeholder="Account" style={{ padding: "10px", margin: "10px", borderRadius: "5px", width: "200px" }} />
      <input type="password" placeholder="Password" style={{ padding: "10px", margin: "10px", borderRadius: "5px", width: "200px" }} />
      <button onClick={handleRegister} style={{ backgroundColor: "#10b981", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>註冊</button>
    </div>
  );
}

export default RegisterPage;
