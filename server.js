const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// //Configure server
const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB_URI + "note";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("build"));
app.use(cors());

// //Routes
const notesRoute = require("./routes/notes");

app.get("favicon.ico", (req, res) => res.status(200).end())

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/notes", notesRoute);

// Start server when database connected...
app.on("ready", function () {
    app.listen(PORT, function () {
        console.log(`Server is running on port ${PORT}...`);
    });
})
mongoose.connect(DB).then(connect => console.log("Connected to mongodb...")).catch(e => console.log("Could not connect to mongodb", e));
mongoose.connection.once("open", function () {
    app.emit("ready");
});
