import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import ErrorMessage from "../../components/Header/ErrorMessage";
import Loading from "../../components/Header/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [picMessage, setPicMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateProfile({ name, email, password, pic }));
      console.log(password);
    }
  };

  return (
    <MainScreen title="EDIT PROFILE" type="form">
      <div style={{ width: "70%" }}>
        <Row className="profileContainer">
          {loading && <Loading />}
          {success && (
            <ErrorMessage variant="success">Updated successfully</ErrorMessage>
          )}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {/* {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )} */}
          <div
            className="formContainer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "25px",
            }}
          >
            <Col>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="text"
                    value={name}
                    placeholder="Enter name"
                    autoComplete="off"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    autoComplete="off"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
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

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pic">
                  <Form.Label>Change profile picture</Form.Label>
                  {/* <Form.Control
                    className="formInput"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  /> */}
                  <Form.Control
                    type="file"
                    className="formInput"
                    onChange={(e) => {
                      setPic(e.target.value);
                    }}
                  />
                </Form.Group>

                <div className="formSubmitArea">
                  <Button
                    variant="primary"
                    type="submit"
                    className="formButton"
                  >
                    Update
                  </Button>

                  <Button variant="danger" className="formButton">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Col>

            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`${userInfo.pic}`}
                alt={name}
                className="profilePic"
                style={{ height: "100%", width: "100%" }}
              />
            </Col>
          </div>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
