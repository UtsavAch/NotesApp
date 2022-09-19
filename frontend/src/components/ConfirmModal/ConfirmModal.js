import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../screens/myNotes/MyNotes.css";

function ConfirmModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = () => {
    if (props.id) {
      props.onDelete(props.id);
    } else {
      props.onDelete();
    }
  };

  return (
    <>
      <div onClick={handleShow} className="noteButton noteDeleteButton">
        {props.buttonName}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={{ fontWeight: "bold" }}>{props.title}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
