const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.filter((n) => n._id === req.params.id);
  res.json(note);
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log("Server started on port " + PORT));
