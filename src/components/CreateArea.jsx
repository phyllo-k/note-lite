import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    const [isFocused, setFocused] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setNote((prevValue) => {
            return {
                ...prevValue,
               [name]: value
            }
        });
    }

    function handleClick(event) {
        if (note.title !== "") {
            props.addNote(note);
            setFocused(false);
            setNote({title: "", content: ""});
        }
        event.preventDefault();
    }

    function toggleFocus() {
        setFocused(isFocused && note.content === "" ? false : true);
    }

    return (
        <div>
            <form className="create-note">
            <input onChange={handleChange} onClick={toggleFocus} name="title" value={note.title} autoComplete="off" placeholder={isFocused ? "Title" : "Take a note..."} />
            {isFocused && <textarea onChange={handleChange} name="content" value={note.content} placeholder="Take a note..." rows="3" />}
            {isFocused && <Zoom in={true}><Fab onClick={handleClick}><AddIcon /></Fab></Zoom>}
            </form>
        </div>
    );
}

export default CreateArea;