import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.css';

function CategoryPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [selectingCategoryId, setSelectingCategoryId] = useState(null);

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddNote = () => {
    setNotes([...notes, { id: Date.now(), text: `Note ${notes.length + 1}`, category: '' }]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, { id: Date.now(), name: newCategory, notes: [], isOpen: false }]);
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const handleAssignNoteToCategory = (noteId, categoryId) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, notes: [...category.notes, noteId] };
      }
      return category;
    });
    const updatedNotes = notes.map(note => note.id === noteId ? { ...note, category: categoryId } : note);
    setCategories(updatedCategories);
    setNotes(updatedNotes);
    setSelectingCategoryId(null);
  };

  const handleToggleCategory = (categoryId) => {
    setCategories(categories.map(cat => cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat));
  };

  const unassignedNotes = notes.filter(note => note.category === '');

  return (
    <div className="category-container">
      <div className="header">
        <h1>NoteGenius</h1>
        <button className="logout-btn" onClick={handleLogout}>log out</button>
      </div>

      <div className="action-buttons">
        <button className="action-btn" onClick={handleAddNote}>新增筆記</button>
        <button className="action-btn" onClick={() => setShowCategoryInput(!showCategoryInput)}>
          分類管理
        </button>
      </div>

      {showCategoryInput && (
        <div className="category-input">
          <input
            type="text"
            placeholder="新增類別名稱"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button onClick={handleAddCategory}>新增</button>
        </div>
      )}

      <div className="note-section">
        <h2>未分類筆記</h2>
        {unassignedNotes.length === 0 ? (
          <p>目前沒有未分類筆記</p>
        ) : (
          unassignedNotes.map(note => (
            <div key={note.id} className="note-item">
              {note.text}
              <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>刪除</button>
            </div>
          ))
        )}
      </div>

      <div className="category-section">
        <h2>分類列表</h2>
        {categories.map(category => (
          <div key={category.id} className="category-block">
            <div className="category-header">
              <span onClick={() => handleToggleCategory(category.id)} className="category-name">
                {category.name}
              </span>
              <button className="assign-btn" onClick={() => setSelectingCategoryId(category.id)}>➕</button>
            </div>

            {selectingCategoryId === category.id && (
              <div className="assign-list">
                {unassignedNotes.map(note => (
                  <div key={note.id} className="assign-note">
                    <span>{note.text}</span>
                    <button onClick={() => handleAssignNoteToCategory(note.id, category.id)}>加入</button>
                  </div>
                ))}
              </div>
            )}

            {category.isOpen && (
              <div className="note-in-category">
                {category.notes.length === 0 ? (
                  <p>（目前沒有筆記）</p>
                ) : (
                  category.notes.map(noteId => {
                    const note = notes.find(n => n.id === noteId);
                    return (
                      <div key={noteId} className="note-item-small">
                        {note ? note.text : '找不到筆記'}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
