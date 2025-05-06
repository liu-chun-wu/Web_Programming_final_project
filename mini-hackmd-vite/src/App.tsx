import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CategoryPage from "./pages/CategoryPage";
import UserSettings from "./pages/UserSettings";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav style={{ backgroundColor: "#1e3a8a", padding: "10px", color: "white" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>登入</Link>
      <Link to="/category" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>分類與筆記</Link>
      <Link to="/settings" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>使用者設定</Link>
      <button onClick={handleLogout} style={{ float: "right", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px" }}>
        登出
      </button>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/category" element={<><Navbar /><CategoryPage /></>} />
        <Route path="/settings" element={<><Navbar /><UserSettings /></>} />
      </Routes>
    </Router>
  );
}

export default App;
