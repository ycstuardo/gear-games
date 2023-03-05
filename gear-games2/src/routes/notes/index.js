const express = require("express");
const router = express.Router();

const createNote = require("../../services/notes/createNote");
const getNotes = require("../../services/notes/getNotes");

router.post("/createNote", (req, res) => {
  createNote(req, res);
});

router.get("/getNotes", (req, res) => {
  getNotes(req, res);
});

module.exports = router;
