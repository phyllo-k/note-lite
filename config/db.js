const mongoose = require("mongoose");
const express = require("express");
const app = express();

const connectDB = async (db) => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}${db}?retryWrites=true&w=majority`);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;