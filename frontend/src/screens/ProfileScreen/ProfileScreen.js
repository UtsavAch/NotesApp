import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import ErrorMessage from "../../components/Header/ErrorMessage";
import Loading from "../../components/Header/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import axios from "axios";
import FormData from "form-data";
import "./ProfileScreen.css";
global.Buffer = global.Buffer || require("buffer").Buffer;

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success } = userUpdate;

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
      setPasswordError(null);
    }
    if (password !== confirmPassword) {
      setPasswordError("Incorrect password");
    }
  };

  const submitImgHandler = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    if (!imgFile) return;
    bodyFormData.append("avatar", imgFile, "avatar.jpg");
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("/api/users/avatar", bodyFormData, config)
      .then((res) => {
        res && window.location.reload(false);
      })
      .catch((error) => {
        setImgError(true);
      });
  };

  //////Get Avatar
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      responseType: "arraybuffer",
    };

    axios
      .get("/api/users/avatar", config)
      .then((response) => {
        const resData = Buffer.from(response.data, "binary").toString("base64");
        setAvatar(`data:image/png;base64,${resData}`);
      })
      .catch((error) => {});
  }, [userInfo]);

  return (
    <MainScreen title="EDIT PROFILE" type="form">
      <div style={{ width: "70%" }}>
        <Row className="profileContainer">
          {loading && <Loading />}
          {passwordError && (
            <ErrorMessage variant="danger">{passwordError}</ErrorMessage>
          )}
          {success && (
            <ErrorMessage variant="success">Updated successfully</ErrorMessage>
          )}
          <div className="formContainer profileFormContainer">
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

                <div className="formSubmitArea">
                  <Button
                    variant="primary"
                    type="submit"
                    className="formButton"
                  >
                    Update
                  </Button>

                  <Button
                    variant="danger"
                    className="formButton"
                    onClick={() => {
                      navigate("/mynotes");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Col>

            <Col className="imgChangeCol">
              <img
                src={avatar ? avatar : pic}
                alt={name}
                className="profileImg"
              />

              <Form
                onSubmit={submitImgHandler}
                method="POST"
                className="imgChangeForm"
              >
                <Form.Group
                  className="mb-3 imgChangeFormControl"
                  controlId="pic"
                >
                  <Form.Label>Change profile picture</Form.Label>
                  <Form.Control
                    type="file"
                    className="formInput"
                    onChange={(e) => {
                      setImgFile(e.target.files[0]);
                    }}
                  />
                </Form.Group>

                <div className="imgColBtnDiv">
                  <Button
                    variant="primary"
                    type="submit"
                    className="formButton"
                  >
                    Change
                  </Button>
                  {imgError && (
                    <p style={{ color: "orangered" }}>
                      "File should be an image and not too large."
                    </p>
                  )}
                </div>
              </Form>
            </Col>
          </div>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
