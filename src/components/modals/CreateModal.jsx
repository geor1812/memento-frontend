import React from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function CreateModal({show, close}) {

    return (<Modal show={show} onHide={close}>
        <Modal.Header className="bg-secondary" closeButton>
            <Modal.Title className="text-white">Add a note</Modal.Title>
        </Modal.Header >
        <Modal.Body className="bg-secondary">
            <form>
                <div className="form-group">
                    <label htmlFor="title" className="col-form-label text-light">Title:</label>
                    <input type="text" className="form-control bg-dark text-light" id="title"/>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer className="bg-secondary">
            <Button variant="dark" onClick={close}>
                Close
            </Button>
            <Button variant="info" onClick={close}>
                Add
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default CreateModal;