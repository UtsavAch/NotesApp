import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import axios from "axios";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./MyNotes.css";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes/");
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome back Utsav...">
      <Link to="/createnote">
        <Button className="mainscreenButton" size="lg">
          New note
        </Button>
      </Link>

      <Accordion defaultActiveKey="0">
        {notes.map((note) => (
          <Accordion.Item
            eventKey={`${notes.indexOf(note)}`}
            key={note._id}
            className="accordionItem"
          >
            <Card className="noteCard">
              <Accordion.Header className="accordionHeader">
                <Card.Header className="noteHeader">
                  <span className="noteTitle">{note.title}</span>
                  <div className="noteButtonContainer">
                    <Link
                      to={`/note/${note._id}`}
                      className="noteButton noteEditButton"
                    >
                      Edit
                    </Link>
                    <div
                      className="noteButton noteDeleteButton"
                      onClick={() => {
                        deleteHandler(note._id);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </Card.Header>
              </Accordion.Header>

              <Accordion.Body>
                <Card.Body className="noteBody">
                  <h4>
                    <Badge bg="light" text="dark">
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on -Date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        ))}
      </Accordion>
    </MainScreen>
  );
};

export default MyNotes;
