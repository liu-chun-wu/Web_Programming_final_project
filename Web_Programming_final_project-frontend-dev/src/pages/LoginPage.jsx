import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (account.trim() === '' || password.trim() === '') {
      alert('請輸入帳號和密碼');
      return;
    }
    navigate('/category');
  };

  return (
    <div className="Register-container">
      <h1>NoteGenius</h1>
      <div className="Register-form-box" id="register-form">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            name="account"
            placeholder="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" name="register">Login</button>
          <p>
            Already have an account?{' '}
            <a onClick={(e) => { e.preventDefault(); navigate('/Register'); }}>
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
