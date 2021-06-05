import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import loginService from './services/login'
import axios from 'axios'

const App = () => {

const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState ('A new note')
const [showAll, setShowAll] =useState(true)
const [errorMessage, setErrorMessage] = useState(null)
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [user, setUser] = useState(null)

const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}



console.log('render', notes.length, 'notes')
useEffect(hook, [])

const addNote = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
  
  const noteObject = {
    content: newNote,
    date: new Date().toISOString(),
    important: Math.random() < 0.5,
    id: notes.length + 1
  }

  setNotes(notes.concat(noteObject))
  setNewNote('')
}

const handleLogin = (event) => {
  event.preventDefault()
  console.log('loggin in with', username, password)
}

const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
}

const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <form onSubmit ={handleLogin}>
        <div>
          username
          <input
          type ="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
          />
          <button type="submit">login</button>
        </div>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)} >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange = {handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App