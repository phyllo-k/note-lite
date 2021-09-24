import React, { useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setNote((preValue) => {
            return {
                ...preValue,
               [name]: value
            }
        });
    }

    function handleClick(event) {
        event.preventDefault();
        if (note.title !== "" || note.content !== "") {
            props.onAdd(note);
            setExpanded(false);
            setNote({title: "", content: ""});
        }
    }

    function toggleFocus() {
        setExpanded(isExpanded && note.content === "" && note.title === "" ? false : true);
    }

    return (
        <div>
            <form className="create-note">
            {isExpanded && <input onChange={handleChange} name="title" value={note.title} autoComplete="off" placeholder={isExpanded ? "Title" : "Take a note..."} />}
            <textarea onChange={handleChange} onClick={toggleFocus} name="content" value={note.content} placeholder="Take a note..." rows={isExpanded ? 3 : 1} />
            {isExpanded && <Zoom in={true}><Fab onClick={handleClick}><AddIcon /></Fab></Zoom>}
            </form>
        </div>
    );
}

export default CreateArea;