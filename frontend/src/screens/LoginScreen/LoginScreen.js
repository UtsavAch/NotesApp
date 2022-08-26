import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen/MainScreen";
import Loading from "../../components/Header/Loading";
import ErrorMessage from "../../components/Header/ErrorMessage";
import { login } from "../../actions/userActions";
import "../../utils/FormScreen.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <MainScreen title="LOGIN" type="form">
      <div className="formContainer">
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="formInput"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="formInput"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div className="formSubmitArea">
            <Button variant="primary" type="submit" className="formButton">
              Login
            </Button>

            <Row>
              <Col>
                Are you new to notes? <Link to="/register">Register Here</Link>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
