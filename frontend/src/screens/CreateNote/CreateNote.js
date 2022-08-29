import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import MainScreen from "../../components/MainScreen/MainScreen";
import ErrorMessage from "../../components/Header/ErrorMessage";
import Loading from "../../components/Header/Loading";
import { createNoteAction } from "../../actions/noteActions";
import "../../utils/FormScreen.css";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;
    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="CREATE NOTE" type="form">
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
              Create Note
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

export default CreateNote;
