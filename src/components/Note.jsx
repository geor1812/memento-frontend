import React, {Component} from "react";
import NoteService from "../service/NoteService";

class Note extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.state = {
            id : null,
            title: "Title Goes Here",
            content: "",
            createdAt: "06-12-2020",
            updatedAt: "06-12-2020"
        }
    }

    onChangeTitle(e) {
        let newTitle = e.target.value;
        this.setState({
            title: newTitle
        })
    }

    render() {
        return(
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <form className="form">
                            <div className="form-group mb-2">
                                <label htmlFor="title" className="sr-only">Title</label>
                                <input type="text" className="form-control-plaintext bg-danger text-white text-center" id="title" value={this.state.title} onChange={this.onChangeTitle} required/>
                            </div>
                            <div className="container">
                                    <div className="row">
                                        <div className="col-sm text-light">
                                            <p>Created on: <p className="font-italic">{this.state.createdAt}</p></p>
                                        </div>
                                        <div className="col-sm text-light">
                                            <p>Last modified on: <p className="font-italic">{this.state.updatedAt}</p></p>
                                        </div>
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;