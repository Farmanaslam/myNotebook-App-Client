import noteContext from "../Context/notes/noteContext";
import React, { useContext, useRef } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [show, setShow] = useState(false);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully reload to see Change..", "success");
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };
  return (
    <>
      <div className="note-page container mt-4">
        <AddNote showAlert={props.showAlert} />

        <Button
          className="d-none"
          ref={ref}
          variant="primary"
          onClick={handleShow}
        >
          Launch demo modal
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Note Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="title"
                  name="etitle"
                  value={note.etitle || ""}
                  onChange={handleChange}
                  minLength={5}
                  required={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  name="edescription"
                  value={note.edescription || ""}
                  onChange={handleChange}
                  minLength={5}
                  required={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="tag"
                  name="etag"
                  value={note.etag || ""}
                  onChange={handleChange}
                  minLength={5}
                  required={true}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button ref={refClose} variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleClick} variant="primary">
              update Note
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row my-3 ">
          <h2>Your Notes are here</h2>
          <div className="container">
            {notes.length === 0 && "no notes to display!! Please Add a Note"}
          </div>
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                updateNote={updateNote}
                showAlert={props.showAlert}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
