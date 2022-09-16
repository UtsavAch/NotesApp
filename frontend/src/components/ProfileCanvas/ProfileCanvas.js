import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import axios from "axios";
import "./ProfileCanvas.css";
global.Buffer = global.Buffer || require("buffer").Buffer;

function ProfileCanvas() {
  const [avatar, setAvatar] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };

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
    <>
      <span onClick={handleShow} className="me-2">
        <img
          src={avatar ? avatar : userInfo.pic}
          alt="Profile"
          width="30"
          height="30"
          className="canvasBtnImage"
        ></img>
      </span>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="canvasBackground"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="canvasTitle">Notes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="canvasBody">
          <img
            src={avatar ? avatar : userInfo.pic}
            alt="Profile Pic"
            width="250"
            height="250"
            className="canvasImage"
          ></img>
          <h1>{userInfo?.name}</h1>
          <p>Email: {userInfo?.email}</p>
          <div className="canvasButtons">
            <Link to="/profile" onClick={handleClose}>
              Edit profile
            </Link>
            <Link to="/" onClick={logoutHandler} className="logout">
              Logout
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ProfileCanvas;
