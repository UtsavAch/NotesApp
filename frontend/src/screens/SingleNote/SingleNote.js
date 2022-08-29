import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import MainScreen from "../../components/MainScreen/MainScreen";
import ErrorMessage from "../../components/Header/ErrorMessage";
import Loading from "../../components/Header/Loading";
import { updateNoteAction } from "../../actions/noteActions";
import axios from "axios";
import "../../utils/FormScreen.css";

const SingleNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const { id: noteId } = useParams();

  const dispatch = useDispatch();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${noteId}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
    };
    fetching();
  }, [noteId]);

  const resetHandler = async () => {
    const { data } = await axios.get(`/api/notes/${noteId}`);
    setTitle(data.title);
    setContent(data.content);
    setCategory(data.category);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(noteId, title, content, category));
    if (!title || !content || !category) return;
    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="EDIT NOTE" type="form">
      <div className="formContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              value={title}
              placeholder="Enter the title"
              autoComplete="off"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="textArea">
            <Form.Label>Content</Form.Label>
            <Form.Control
              className="formInput"
              as="textarea"
              rows={5}
              value={content}
              placeholder="Enter the content"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </Form.Group>
          {content && (
            <Card>
              <Card.Header>Preview</Card.Header>
              <Card.Body>
                <ReactMarkdown>{content}</ReactMarkdown>
              </Card.Body>
            </Card>
          )}

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              value={category}
              placeholder="Enter the category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </Form.Group>
          {loading && <Loading />}
          <div className="formSubmitArea">
            <Button variant="primary" type="submit" className="formButton">
              Update Note
            </Button>
            <Button
              variant="danger"
              className="formButton"
              onClick={resetHandler}
            >
              Reset Fields
            </Button>
          </div>
        </Form>
      </div>
    </MainScreen>
  );
};

export default SingleNote;
