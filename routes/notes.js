const router = require("express").Router();
const Note = require("../models/note.model");

router.route("/")
    .get(function (req, res) {
        Note.find()
            .then(notes => res.json(notes))
            .catch(err => res.status(400).json("Error: " + err));
    })

    .post(function (req, res) {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content
        })
        newNote.save()
            .then(() => res.json("Note added!"))
            .catch(err => res.status(400).json("Error: " + err));
    })
;

router.route("/:id")
    .delete(function (req, res) {
        Note.findByIdAndRemove(req.params.id)
            .then(() => res.json("Note deleted!"))
            .catch(err => res.status(400).json("Error: " + err));
    })
;


module.exports = router;