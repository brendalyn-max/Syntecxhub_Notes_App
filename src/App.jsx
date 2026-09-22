import {
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('syntecxhub-notes')

    if (savedNotes) {
      return JSON.parse(savedNotes)
    }

    return []
  })

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)

  const titleInputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(
      'syntecxhub-notes',
      JSON.stringify(notes),
    )
  }, [notes])

  const saveNote = (event) => {
    event.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert('Bestie, fill in the title and your note first.')
      return
    }

    if (editingId !== null) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
              }
            : note,
        ),
      )

      setEditingId(null)
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
      }

      setNotes((currentNotes) => [
        newNote,
        ...currentNotes,
      ])
    }

    setTitle('')
    setContent('')
    titleInputRef.current?.focus()
  }

  const editNote = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)

    titleInputRef.current?.focus()
  }

  const deleteNote = (id) => {
    const confirmed = window.confirm(
      'Bestie, are you sure you want to delete this note?',
    )

    if (confirmed) {
      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== id),
      )
    }
  }

  const cancelEdit = () => {
    setTitle('')
    setContent('')
    setEditingId(null)

    titleInputRef.current?.focus()
  }

  const filteredNotes = notes.filter((note) => {
    const searchTerm = search.toLowerCase()

    return (
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <main className="app">
      <div className="container">

        <header className="header">
          <div className="brand">
            <div className="brand-icon">
              <FileText size={20} />
            </div>

            <span>Bestie Notes</span>
          </div>

          <h1>
            Hey bestie, <span>what are we noting down today?</span>
          </h1>

          <p className="subtitle">
            A thought, a reminder, a random idea — just put it here.
          </p>
        </header>

        <section className="note-editor glass-card">
          <div className="editor-heading">
            <div>
              <h2>
                {editingId !== null
                  ? 'Okay bestie, let’s edit it'
                  : 'Okay bestie, let’s write it down'}
              </h2>

              <p className="editor-subtitle">
                {editingId !== null
                  ? 'Make those little changes and we’re good.'
                  : 'Your brain has ideas. Let’s give them a place to live.'}
              </p>
            </div>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-button"
                onClick={cancelEdit}
              >
                <X size={18} />
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={saveNote}>
            <input
              ref={titleInputRef}
              type="text"
              placeholder="Give your note a cute little title..."
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />

            <textarea
              placeholder="Okay, tell me everything..."
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              rows="6"
            />

            <button type="submit" className="save-button">
              <Plus size={19} />

              {editingId !== null
                ? 'Save Changes'
                : 'Save My Note'}
            </button>
          </form>
        </section>

        <section className="notes-section">

          <div className="section-header">
            <div>
              <h2>Our Little Notes</h2>

              <p>
                {notes.length === 0
                  ? 'Nothing here yet — let’s change that.'
                  : `${notes.length} ${
                      notes.length === 1 ? 'note' : 'notes'
                    } so far`}
              </p>
            </div>

            <div className="search-box">
              <Search size={18} />

              <input
                type="text"
                placeholder="Find a note..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="empty-state glass-card">
              <FileText size={45} />

              <h3>
                {search
                  ? 'Hmm, nothing here bestie'
                  : 'It’s a little empty here'}
              </h3>

              <p>
                {search
                  ? 'Try another word and let’s find it.'
                  : 'Got something on your mind? Write it down and make yourself at home.'}
              </p>
            </div>
          ) : (
            <div className="notes-grid">

              {filteredNotes.map((note) => (
                <article
                  className="note-card glass-card"
                  key={note.id}
                >

                  <div className="note-card-header">

                    <div className="note-icon">
                      <FileText size={19} />
                    </div>

                    <div className="note-actions">

                      <button
                        type="button"
                        className="icon-button"
                        onClick={() => editNote(note)}
                        aria-label="Edit note"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        className="icon-button delete-button"
                        onClick={() => deleteNote(note.id)}
                        aria-label="Delete note"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </div>

                  <h3>{note.title}</h3>

                  <p className="note-content">
                    {note.content}
                  </p>

                  <time>
                    {new Date(
                      note.createdAt,
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>

                </article>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  )
}

export default App