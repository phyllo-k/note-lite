import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get("/notes")
            .then(res => { res.data.length > 0 && setNotes(res.data);
        });
    }, []);

    function addNote(note) {
        setNotes(preValue => {
            return [...preValue, note];
        });
        axios.post("/notes", note);
    }

    function deleteNote(id) {
        setNotes(preValue => {
            return preValue.filter((note) => {
                return note._id !== id;
            });
        });
        axios.delete(`/notes/${id}`);
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((note, index) => {
                return <Note
                    key = {note._id}
                    id = {note._id}
                    title = {note.title}
                    content = {note.content}
                    onDelete = {deleteNote}
                />
            })}
            <Footer />
        </div>
    );
}

export default App;
