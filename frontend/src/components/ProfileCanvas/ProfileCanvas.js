import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import "./ProfileCanvas.css";

function ProfileCanvas(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };

  return (
    <>
      <span onClick={handleShow} className="me-2 offcanvasTitle">
        {props.title} &rarr;
      </span>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ backgroundColor: "#e5fff6" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h1>Utsav Acharya</h1>
          <p>I am Utsav Acharya.</p>
          <div
            onClick={logoutHandler}
            style={{ fontWeight: "bold", cursor: "pointer" }}
          >
            Logout
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ProfileCanvas;
