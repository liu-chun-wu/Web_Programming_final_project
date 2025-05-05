import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const Register = () => {
  const navigate = useNavigate();

  // 👉 用 useState 來記錄使用者輸入
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // 👉 提交表單時的處理函式
  const handleRegister = async (e) => {
    e.preventDefault(); // 阻止表單預設行為

    if (!username || !email || !password) {
      alert('請填寫所有欄位');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('註冊成功');
        navigate('/');
      } else {
        alert('註冊失敗: ' + result.message);
      }
    } catch (err) {
      console.error('發生錯誤:', err);
      alert('連線失敗，請稍後再試');
    }
  };

  return (
    <div className="Register-container">
      <h1>NoteGenius</h1>
      <div className="Register-form-box" id="register-form">
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" name="register">Register</button>
          <p>
            Already have an account?{' '}
            <a onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
