import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteNoteAction } from "../../actions/noteActions";
import "../../screens/myNotes/MyNotes.css";

function ConfirmModal(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = () => {
    dispatch(deleteNoteAction(props.id));
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
