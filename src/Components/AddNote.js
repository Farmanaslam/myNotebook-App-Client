import React from "react";
import noteContext from "../Context/notes/noteContext";
import { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully");
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };
  return (
    <div>
      <h1>Add a Note</h1>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Note Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={handleChange}
            minLength={5}
            required={true}
            value={note.title}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={handleChange}
            minLength={5}
            required={true}
            value={note.description}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type="text"
            name="tag"
            onChange={handleChange}
            minLength={5}
            required={true}
            value={note.tag}
          />
        </Form.Group>
        <Button className="add-btn" type="submit" onClick={handleClick}>
          Add Note
        </Button>
      </Form>
    </div>
  );
};

export default AddNote;
