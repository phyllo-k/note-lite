import React, { useState, useEffect, useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
    const wrapperRef = useRef(null);
    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        }
    }, [note]);


    function handleChange(event) {
        const {name, value} = event.target;

        setNote(preValue => {
            return {
                ...preValue,
               [name]: value
            }
        });
    }

    function handleClickOutside(event) {
        if(wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            if (note.title !== "" || note.content !== "") {
                props.onAdd(note);
                setNote({title: "", content: ""});
            }
            event.preventDefault();
            setExpanded(false);
        }
    }

    function expand() {
        !isExpanded && setExpanded(true);
    }

    return (
        <div>
            <form className="create-note" ref={wrapperRef}>
                {isExpanded && <input onChange={handleChange} name="title" value={note.title} autoComplete="off" placeholder={isExpanded ? "Title" : "Take a note..."} />}
                <textarea onChange={handleChange} onClick={expand} name="content" value={note.content} placeholder="Take a note..." rows={isExpanded ? 3 : 1} />
            </form>
        </div>
    );
}

export default CreateArea;