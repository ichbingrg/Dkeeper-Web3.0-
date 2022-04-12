import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper} from "../../../declarations/dkeeper"


function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    dkeeper.createNote(newNote.title, newNote.content);
    setNotes(prevNotes => {
      return [newNote, ...prevNotes];
    });
  }

  // now that we save and fetch our data from motoko code; even if we refresh the page, the existing list will still remain.
  async function fetchData() {
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  }

  //useEffect is the hook to recognize reloads of a page. 
  // useEffect(<action on reload> , [number of times the action is to be performed])
  useEffect(()=>{
    console.log("useEffect");
    fetchData();
  },[]); 

  function deleteNote(id) {
    setNotes(prevNotes => {
      dkeeper.removeNote(id);
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
