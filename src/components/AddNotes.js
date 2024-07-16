import noteContext from '../context/notes/noteContext'
import React, { useContext, useState } from 'react'

const AddNotes = (props) => {
    const context = useContext(noteContext);
    const { addNotes } = context;

    const [notes , setNotes] = useState({title : "",description : "",tag : ""})

    const handleSubmit = (e)=>{
        e.preventDefault();//not load the page
        addNotes(notes.title,notes.description,notes.tag);
        setNotes({title : "",description : "",tag : ""})
        props.showAlert("Notes Added successfully","success")
    }

    const onChange = (e)=>{
        setNotes({...notes,[e.target.name]:e.target.value});
    }
  return (
    <div className='conatiner my-3'>
      <h2>Add Notes</h2>
      <form className='formContainer my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"value={notes.title}
          onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description"value={notes.description}
          onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">tag</label>
          <input type="text" className="form-control" id="tag" name="tag"value={notes.tag}
          onChange={onChange} minLength={5} required/>
        </div>
        <button disabled={notes.title.length<5||notes.description.length<5}type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Notes </button>
      </form>
      </div>
      
  )
}

export default AddNotes
