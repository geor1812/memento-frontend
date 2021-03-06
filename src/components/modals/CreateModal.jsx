import React, {Component} from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

class CreateModal extends Component{
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);

        this.state = {
            title : null
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleClick1() {
        this.props.handleNoteCreate(this.state.title, false);
    }

    handleClick2() {
        this.props.handleNoteCreate(this.state.title, true);
    }

    render() {
       return (<Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header className="bg-secondary" closeButton>
                <Modal.Title className="text-white">Add a note</Modal.Title>
            </Modal.Header >
            <Modal.Body className="bg-secondary">
                <form>
                    <div className="form-group">
                        <label htmlFor="title" className="col-form-label text-light">Title:</label>
                        <input type="text" className="form-control bg-dark text-light" id="title" onChange={this.onChangeTitle} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className="bg-secondary text-left">
                <p className="float-left text-light">Type:</p>
                <button className="btn btn-danger float-left" type="submit" onClick={this.handleClick1}>
                    Note
                </button>
                <Button variant="warning" className="float-left" onClick={this.handleClick2}>
                    Checklist
                </Button>
                <Button variant="dark" onClick={this.props.close}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>)
    }
}

export default CreateModal;