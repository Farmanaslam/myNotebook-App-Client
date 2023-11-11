import React from "react";
import noteContext from "../Context/notes/noteContext";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;
  return (
    <div className="col-md-4">
      <Card className="my-2">
        <Card.Body>
          <div className="d-flex align-items-center">
            <Card.Title>{note.title}</Card.Title>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <Card.Text>{note.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteItem;
