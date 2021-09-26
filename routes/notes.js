const router = require("express").Router();
const Note = require("../models/note.model");

// @desc    API to get and create new note
// @route   Get, Post /notes
router.route("/")
    .get(function (req, res) {
        Note.find()
            .then(notes => res.json(notes))
            .catch(err => res.status(400).json("Error: " + err));
    })

    .post((req, res) => {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content
        })
        newNote.save()
            .then(() => res.json(newNote))
            .catch(err => res.status(400).json("Error: " + err));
    })
;

// @desc    Delete note
// @route   Delete /notes/:id
router.route("/:id")
    .delete(function (req, res) {
        Note.findByIdAndRemove(req.params.id)
            .then(() => res.json("Note deleted!"))
            .catch(err => res.status(400).json("Error: " + err));
    })
;


module.exports = router;