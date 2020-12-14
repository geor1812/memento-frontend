import React from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function ArchiveModal({show, close, title}) {

    return (<Modal show={show} onHide={close}>
        <Modal.Header className="bg-secondary" closeButton>
            <Modal.Title className="text-white">Archive a note</Modal.Title>
        </Modal.Header >
        <Modal.Body className="bg-secondary">
            <form>
                <div className="form-group">
                    <label htmlFor="title" className="col-form-label text-light">{`Archive the note titled: ${title}?`}</label>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer className="bg-secondary">
            <Button variant="danger" onClick={close}>
                Confirm
            </Button>
            <Button variant="dark" onClick={close}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default ArchiveModal;