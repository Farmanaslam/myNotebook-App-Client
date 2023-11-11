const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");

const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// Route :1  fetching all notes of user at /api/notes/fetchalnoes no login required using get requesrt
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured!!");
  }
});

// Route :2  adding a note of a user at /api/notes/addnote no login required using post requesrt
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "title must be atleast 5 characters").isLength({ min: 5 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 2,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //if there are err return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //creating note  for a user....
      const notes = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //saving notes for a  user........
      const saveNote = await notes.save();
      res.json(saveNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured!!");
    }
  }
);

// Route :3  upadting an existing  note of a user at /api/notes/updatenote  login required using put requesrt
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //creating neNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find that note and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //checking if logged in is updating other user note or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("some error occured!!");
  }
});

// Route :4  Deleting an existing  note of a user at /api/notes/deletenote  login required using delete requesrt
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //find that note and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //allown deletion of a note or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted...", note: note });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("some error occured!!");
  }
});

module.exports = router;
