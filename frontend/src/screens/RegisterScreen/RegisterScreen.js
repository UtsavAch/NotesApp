import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";
import "../../utils/FormScreen.css";

const LoginScreen = () => {
  return (
    <MainScreen title="REGISTER" type="form">
      <div className="formContainer">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="formInput"
              type="email"
              //   value="email"
              placeholder="Enter email"
              //   onChange={(e) => {
              //     setEmail(email.target.value);
              //   }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="formInput"
              type="password"
              //   value="password"
              placeholder="Password"
              //   onChange={(e) => {
              //     setPassword(e.target.value);
              //   }}
            />
          </Form.Group>

          <div className="formSubmitArea">
            <Button variant="primary" type="submit" className="formButton">
              Register
            </Button>

            <Row>
              <Col>
                Do you have a notes account? <Link to="/login">Login Here</Link>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
