import React, { useContext } from 'react'
//import Notes from './Notes'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNotes}=context;
    const { notes ,updateNote} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className='d-flex align-items-center mx-2'>
                        <h5 className="card-title">{notes.title}</h5>
                        
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNotes(notes._id);
                        props.showAlert("Deleted successfully","success");}} ></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}}></i>
                    </div>
                    <p className="card-text">{notes.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
