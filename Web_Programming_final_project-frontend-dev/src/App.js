import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import EditPage from './pages/EditPage';
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/edit/:noteId" element={<EditPage />} />
        <Route path="/register" element={<RegisterPage/>} />

      </Routes>
    </Router>
  );
}

export default App;
