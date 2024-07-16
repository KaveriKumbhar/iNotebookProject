//import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = 'http://localhost:3000'

  // const s1 ={
  //     "name":" kaveri",
  //     "class":"T.Y.BTECH"
  // }
  // const [state,setState] = useState(s1)
  // const updateState=()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":" sanika",
  //             "class":"T.Y.BTECH - nursing"
  //         }) 
  //     },1000)
  // }


  const initalNotes = []
  const [notes, setNotes] = useState(initalNotes)

  //Get all Notes-------
  const getNotes = async() => {
    //API CALL

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      //body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
   // return response.json(); // parses JSON response into native JavaScript objects
    const json = await response.json();
    //console.log(json);
    setNotes(json)
  }

  //Add Notes-------
  const addNotes = async(title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setNotes(notes.concat(note)) // parses JSON response into native JavaScript objects
   

   // return response.json(); // parses JSON response into native JavaScript objects

   //logic for add note
  
    
  }

  //Delete Notes------
  const deleteNotes = async(id) => {
    //API CALL

    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      
      },
      //body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
   // console.log(json)
    //logic for delete note
    const newNote = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNote);
  }

  //Edit Notes------
  const editNotes = async (id, title, description, tag) => {

    //API CALL

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
   // console.log(json)


    //logic to edit notes

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;