const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const morgan = require("morgan");

// //Config server
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";
const db = "note"; // DB name

connectDB(db);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("build"));
env === "development" && app.use(morgan("dev"));

// //Routes
app.use("/", require("./routes/index"));
app.use("/notes", require("./routes/notes"));
app.use("/auth", require("./routes/auth"));


app.listen(port, console.log(`Server running in ${env} on port ${port}...`));
