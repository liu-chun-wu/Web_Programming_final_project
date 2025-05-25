import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import NoteEditor from '../components/note/NoteEditor';
import AiChat from '../components/note/AiChat';
import NotesList from '../components/note/NotesList';
import { Button } from '../components/ui/Button';
import './NotePage.css';

export default function NotePage() {
  const { noteId } = useParams();
  const [userId, setUserId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(noteId || null);
  const [notes, setNotes] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [aiChatVisible, setAiChatVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [aiChatWidth, setAiChatWidth] = useState(400);
  const draggingRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/users/me/", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("未登入");
        return res.json();
      })
      .then(data => setUserId(data?.id))
      .catch(() => window.location.href = "/login");
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetch("http://localhost:8000/api/notes/", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(note => { map[note.id] = note; });
        setNotes(map);
      });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetch("http://localhost:8000/api/tags/", { credentials: "include" })
      .then(res => res.json())
      .then(data => setTags(data.map(tag => tag.name)));
  }, [userId]);

  useEffect(() => {
    if (noteId) setSelectedNote(noteId);
  }, [noteId]);

  useEffect(() => {
    localStorage.setItem('aiChatVisible', JSON.stringify(aiChatVisible));
  }, [aiChatVisible]);

  const handleMouseDown = (area) => (e) => {
    draggingRef.current = { area, startX: e.clientX };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!draggingRef.current) return;
    const deltaX = e.clientX - draggingRef.current.startX;
    if (draggingRef.current.area === 'sidebar') {
      setSidebarWidth(prev => Math.min(Math.max(prev + deltaX, 200), 500));
    } else if (draggingRef.current.area === 'aiChat') {
      setAiChatWidth(prev => Math.min(Math.max(prev - deltaX, 200), 600));
    }
    draggingRef.current.startX = e.clientX;
  };

  const handleMouseUp = () => {
    draggingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => () => handleMouseUp(), []);

  const columns = [];
  if (sidebarOpen) {
    columns.push(`${sidebarWidth}px`, '5px');
  }
  columns.push('1fr', '5px');
  if (aiChatVisible) {
    columns.push(`${aiChatWidth}px`);
  }
  const gridTemplateColumns = columns.join(' ');

  const handleSaveNote = async (id, title, content, tag_names) => {
    const response = await fetch(`http://localhost:8000/api/notes/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, content, tag_names }),
    });
    if (!response.ok) return;
    const updatedNote = await response.json();
    setNotes(prev => ({ ...prev, [id]: updatedNote }));
  };

  const handleCreateNote = async () => {
    if (!userId) return;
    const response = await fetch("http://localhost:8000/api/notes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user: userId,
        title: "新筆記",
        content: "這是一筆新的內容",
        tag_names: []
      })
    });
    if (!response.ok) return;
    const newNote = await response.json();
    setNotes(prev => ({ ...prev, [newNote.id]: newNote }));
    setSelectedNote(newNote.id);
  };

  const handleCreateNoteWithTag = async (tag) => {
    if (!userId) return;
    const response = await fetch("http://localhost:8000/api/notes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user: userId,
        title: "新筆記",
        content: "這是一筆新的內容",
        tag_names: [tag]
      })
    });
    if (!response.ok) return;
    const newNote = await response.json();
    setNotes(prev => ({ ...prev, [newNote.id]: newNote }));
    setSelectedNote(newNote.id);
  };

  const handleDeleteNote = async (id) => {
    const response = await fetch(`http://localhost:8000/api/notes/${id}/`, {
      method: "DELETE",
      credentials: "include"
    });
    if (!response.ok) return;
    setNotes(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    if (selectedNote === id) setSelectedNote(null);
  };

  const handleRenameNote = async (id, newTitle) => {
    const response = await fetch(`http://localhost:8000/api/notes/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: newTitle }),
    });
    if (!response.ok) return;
    const updatedNote = await response.json();
    setNotes(prev => ({ ...prev, [id]: updatedNote }));
  };

  const handleCreateTag = async (tagName) => {
    if (!tagName || tags.includes(tagName)) return;
    const response = await fetch("http://localhost:8000/api/tags/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: tagName })
    });
    if (!response.ok) return;
    const newTag = await response.json();
    setTags(prev => [...prev, newTag.name]);
  };

  const handleRenameTag = async (oldName, newName) => {
    const res = await fetch("http://localhost:8000/api/tags/", { credentials: "include" });
    const tagsData = await res.json();
    const tagToUpdate = tagsData.find(t => t.name === oldName);
    if (!tagToUpdate) return;
    const patchRes = await fetch(`http://localhost:8000/api/tags/${tagToUpdate.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: newName })
    });
    if (!patchRes.ok) return;
    setTags(prev => prev.map(t => (t === oldName ? newName : t)));
    setNotes(prevNotes => {
      const updated = { ...prevNotes };
      for (const id in updated) {
        const note = updated[id];
        if (Array.isArray(note.tags)) {
          const newTags = note.tags.map(t => t.name === oldName ? { ...t, name: newName } : t);
          updated[id] = { ...note, tags: newTags };
        }
      }
      return updated;
    });
  };

  const handleDeleteTag = async (name) => {
    const tagRes = await fetch("http://localhost:8000/api/tags/", { credentials: "include" });
    const tagsData = await tagRes.json();
    const tagToDelete = tagsData.find(t => t.name === name);
    if (!tagToDelete) return;
    const res = await fetch(`http://localhost:8000/api/tags/${tagToDelete.id}/`, {
      method: "DELETE",
      credentials: "include"
    });
    if (!res.ok) return;
    setTags(prev => prev.filter(t => t !== name));
  };

  return (
    <>
      <div className="sidebar-toggle">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? '關閉側邊欄' : '顯示側邊欄'}
          className="sidebar-toggle-icon"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="12" height="12" rx="2" />
            <line x1="8" y1="4" x2="8" y2="16" />
          </svg>
        </Button>
      </div>

      <div className="note-page-grid" style={{ gridTemplateColumns }}>
        {sidebarOpen && (
          <div className="sidebar">
            <div className="sidebar-header">
              <h2>我的筆記</h2>
              <Button onClick={handleCreateNote}>新增筆記</Button>
              <Button onClick={() => {
                const tagName = prompt("請輸入新標籤名稱:");
                if (tagName) handleCreateTag(tagName);
              }}>
                新增標籤
              </Button>
            </div>
            <NotesList
              notes={notes}
              selectedNote={selectedNote}
              onSelectNote={setSelectedNote}
              onDeleteNote={handleDeleteNote}
              onRenameNote={handleRenameNote}
              tags={tags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              onCreateTag={handleCreateTag}
              onRenameTag={handleRenameTag}
              onDeleteTag={handleDeleteTag}
              searchKeyword={searchKeyword}
              onSearchKeywordChange={setSearchKeyword}
              handleCreateNoteWithTag={handleCreateNoteWithTag}
            />
          </div>
        )}

        {sidebarOpen && (
          <div className="dragger" onMouseDown={handleMouseDown('sidebar')} />
        )}

        <div className="editor-area">
          {selectedNote && notes[selectedNote] ? (
            <NoteEditor
              key={selectedNote}
              noteId={selectedNote}
              initialTitle={notes[selectedNote]?.title}
              initialContent={notes[selectedNote]?.content}
              initialTags={(notes[selectedNote]?.tags || []).map((t) => t.name)}
              tags={tags}
              onSave={handleSaveNote}
              onCreateTag={handleCreateTag}
            />
          ) : (
            <div style={{ textAlign: 'center', marginTop: 40, color: '#666' }}>
              請點選左側筆記或新增一個新筆記
            </div>
          )}
        </div>

        <div className="dragger" onMouseDown={handleMouseDown('aiChat')} />

        {aiChatVisible && (
          <div className="ai-chat-area">
            {selectedNote && notes[selectedNote] && (
              <AiChat
                noteId={notes[selectedNote].id}
                onToggleVisibility={() => setAiChatVisible(!aiChatVisible)}
              />
            )}
          </div>
        )}
      </div>

      {!aiChatVisible && (
        <Button className="show-ai-button" onClick={() => setAiChatVisible(true)}>
          顯示 AI 助手
        </Button>
      )}
    </>
  );
}
