import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Badge } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import notes from "../../data/notes";

const MyNotes = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  return (
    <MainScreen title="Welcome back Utsav...">
      <Link to="/createnote">
        <Button
          style={{
            marginLeft: "10px",
            marginBottom: "6px",
            textTransform: "capitalize",
          }}
          size="lg"
        >
          New note
        </Button>
      </Link>

      {notes.map((note) => (
        <Card style={{ margin: 10 }} key={note._id}>
          <Card.Header style={{ display: "flex" }}>
            <span
              style={{
                color: "#444",
                textDecoration: "none",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {note.title}
            </span>
            <div>
              <Link to={`/note/${note._id}`}>
                <Button>Edit</Button>
              </Link>
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => {
                  deleteHandler(note._id);
                }}
              >
                Delete
              </Button>
            </div>
          </Card.Header>

          <Card.Body>
            <h4>
              <Badge bg="light" text="dark">
                Category - {note.category}
              </Badge>
            </h4>
            <blockquote className="blockquote mb-0">
              <p>{note.content}</p>
              <footer className="blockquote-footer">Created on -Date</footer>
            </blockquote>
          </Card.Body>
        </Card>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
