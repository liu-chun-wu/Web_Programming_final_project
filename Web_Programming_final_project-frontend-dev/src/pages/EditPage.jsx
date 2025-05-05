import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPage.css';

function EditPage() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="edit-container">
      <h1 className="edit-title">編輯筆記 {noteId}</h1>
      <textarea className="edit-textarea" placeholder="在這裡編輯你的筆記內容..." />
      <div className="edit-actions">
        <button className="save-btn">儲存</button>
        <button className="cancel-btn" onClick={() => navigate('/category')}>取消</button>
      </div>
    </div>
  );
}

export default EditPage;
