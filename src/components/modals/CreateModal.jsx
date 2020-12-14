import React, {useState} from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function CreateModal({show, close, handleCreate}) {
    const [title, setTitle] = useState("");

    return (<Modal show={show} onHide={close}>
        <Modal.Header className="bg-secondary" closeButton>
            <Modal.Title className="text-white">Add a note</Modal.Title>
        </Modal.Header >
        <Modal.Body className="bg-secondary">
            <form>
                <div className="form-group">
                    <label htmlFor="title" className="col-form-label text-light">Title:</label>
                    <input type="text" className="form-control bg-dark text-light" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer className="bg-secondary text-left">
            <p className="float-left text-light">Type:</p>
            <Button variant="danger" className="float-left" onClick={close}>
                Note
            </Button>
            <Button variant="warning" className="float-left" onClick={close}>
                Checklist
            </Button>
            <Button variant="dark" onClick={close}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default CreateModal;