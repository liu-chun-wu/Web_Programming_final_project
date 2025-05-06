import React, { useState } from "react";

function CategoryPage() {
  const [notes, setNotes] = useState<{ id: number; text: string; category: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  const addNote = () => {
    const newNote = { id: Date.now(), text: `Note ${notes.length + 1}`, category: "" };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const assignCategory = (noteId: number, category: string) => {
    setNotes(notes.map(note => note.id === noteId ? { ...note, category } : note));
  };

  const filteredNotes = selectedCategory === "全部" 
    ? notes 
    : notes.filter(note => note.category === selectedCategory);

  const unCategorizedNotes = notes.filter(note => !note.category);

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f9fbfc" }}>
      {/* 左側分類 */}
      <div style={{ width: "250px", backgroundColor: "#1e3a8a", color: "white", padding: "20px" }}>
        <h2>分類</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li onClick={() => setSelectedCategory("全部")} style={{ cursor: "pointer", color: selectedCategory === "全部" ? "#00BFFF" : "white", marginBottom: "10px" }}>
            全部
          </li>
          {categories.map((cat, index) => (
            <li key={index} onClick={() => setSelectedCategory(cat)} style={{ cursor: "pointer", color: selectedCategory === cat ? "#00BFFF" : "white", marginBottom: "10px" }}>
              {cat}
            </li>
          ))}
        </ul>
        <input type="text" placeholder="新增分類" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ padding: "8px", width: "100%", marginBottom: "10px", borderRadius: "6px" }} />
        <button onClick={addCategory} style={{ padding: "8px", width: "100%", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px" }}>新增分類</button>
      </div>

      {/* 右側筆記 */}
      <div style={{ flex: 1, padding: "30px" }}>
        <h2>未分類筆記</h2>
        {unCategorizedNotes.map(note => (
          <div key={note.id} style={{ background: "#ffffff", padding: "15px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}>
            <p>{note.text}</p>
            <select onChange={(e) => assignCategory(note.id, e.target.value)} style={{ marginRight: "10px" }}>
              <option value="">請選擇分類</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            <button onClick={() => deleteNote(note.id)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}>刪除</button>
          </div>
        ))}

        <h2>{selectedCategory} 的筆記</h2>
        {filteredNotes.map(note => (
          <div key={note.id} style={{ background: "#ffffff", padding: "15px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}>
            <p>{note.text}</p>
            <button onClick={() => deleteNote(note.id)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}>刪除</button>
          </div>
        ))}

        <button onClick={addNote} style={{ marginTop: "20px", backgroundColor: "#2563eb", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
          新增筆記
        </button>
      </div>
    </div>
  );
}

export default CategoryPage;
