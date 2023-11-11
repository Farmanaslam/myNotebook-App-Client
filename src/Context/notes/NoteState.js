import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //fetching a note func
  const getNotes = async () => {
    //adding API Calls...
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //    //adding a note func
  //  const addNote = async (title, description, tag) => {
  //      //adding API Calls...
  //      const response =await fetch(`${host}/api/notes/addnote`, {
  //      method: "POST",
  //       headers: {
  //        "Content-Type": "application/json",
  //        "auth-token":
  //         localStorage.getItem("token")
  //      },
  //       body: JSON.stringify({ title, description, tag }),
  //    });
  //    console.log("adding a new note");
  //    const note = {
  //      _id: "65256a9c42587eafad78ce8b0",
  //      user: "65256a9c42587eafad78ce8a",
  //      title: title,
  //        description: description,
  //       tag: tag,
  //       date: "2023-10-15T07:04:35.798Z",
  //       __v: 0,
  //    };

  //     setNotes(notes.concat(note));
  //  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a new note");
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //deleting a note func
  const deleteNote = async (id) => {
    //adding API Calls...
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    console.log("note deleted..." + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //adding a note func
  const editNote = async (id, title, description, tag) => {
    //adding API Calls...
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    //updating note in client-side...
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element.id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
