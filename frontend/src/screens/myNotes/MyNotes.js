import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen/MainScreen";
import { listNotes } from "../../actions/noteActions";
import Loading from "../../components/Header/Loading";
import "./MyNotes.css";

const MyNotes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successCreate, successUpdate]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name.split(" ")[0]}...`}>
      <Link to="/createnote">
        <Button className="mainscreenButton" size="lg">
          New note
        </Button>
      </Link>

      <Accordion defaultActiveKey="0">
        {loading && <Loading />}
        {error && (
          <p className="noNotes" style={{ color: "orangered" }}>
            {error}
          </p>
        )}
        {notes?.length === 0 && (
          <p className="noNotes">You do not have any notes. Please add some.</p>
        )}
        {notes?.reverse().map((note, index) => (
          <Accordion.Item
            eventKey={index}
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
                      Created at {note.createdAt.substring(0, 10)}
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
