import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search'
import Header from './components/Header'



const App = () => {
  const [notes, setNotes]= useState([
    {
    id: nanoid(),
    text: "This is my first note",
    date: "10/26/22"
  
  },
  {
    id: nanoid(),
    text: "This is my second note",
    date: "10/26/22"
  
  },
  {
    id: nanoid(),
    text: "This is my third note",
    date: "10/26/22"
  
  }
]);

const addNote = (text) =>{
    const date = new Date();
    const newNote={
      id: nanoid(),
      text:text,
      date: date.toLocaleDateString()

    }
    const newNotes=[...notes, newNote];
    setNotes(newNotes);
}

const deleteNote = (id) => {
  const newNotes = notes.filter((note)=>note.id !== id);
  setNotes(newNotes);
}

const [searchText, setSearchText]= useState('');

const [darkMode, setDarkMode] = useState(false)

// saves notes to local storage
useEffect(()=> {
  localStorage.setItem('react-notes-app-data',JSON.stringify(notes))
},[notes])

// retrieves notes from local storage
useEffect(()=> {
  const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))

  if (savedNotes){
    setNotes(savedNotes)
  }
},[]) // leave bottom array empty for retrieving

return(
  <div className={`${darkMode && 'dark-mode'}`}>
    <div className="container">
    <Header handleToggleDarkMode={setDarkMode}/>
    <Search handleSearchNote={setSearchText}/>
    <NotesList notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} handleAddNote={addNote} handleDeleteNote={deleteNote}/>
    </div>
  </div>
  
)

}



export default App;