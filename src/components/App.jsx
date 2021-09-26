import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(async () => {
        try {
            const res = await axios.get("/notes");
            res.data.length > 0 && setNotes(res.data);
        } catch (err) {
            console.log(err);
        }        
    }, []);

    async function addNote(note) {
        try {
            const res = await axios.post("/notes", note);
            setNotes(preValue => {
                return[...preValue, res.data];
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteNote(id) {
        try {
            const res = await axios.delete(`/notes/${id}`);
            setNotes(preValue => {
                return preValue.filter((note) => {
                    return note._id !== id;
                });
            });
        } catch (err) {
            console.log(err);
        }
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