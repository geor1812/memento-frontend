import React, {Component} from "react";
import NoteService from "../service/NoteService";

class Note extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.state = {
            id : null,
            title: "Title Goes Here",
            content: "This is an example of some note context",
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

    onChangeContent(e) {
        let newContent = e.target.value;
        this.setState({
            content: newContent
        })
    }

    render() {
        return(
            <div className="container mt-3" style={{
                borderStyle: "solid",
                borderColor: "#000000",
                borderRadius: "10px",
            }}>
                <div className="row m-3 bg-dark p-1" style={{
                    borderStyle: "solid",
                    borderColor: "#000000",
                    borderRadius: "10px",
                    borderWidth: "2px",
                }}>
                    <div className="col-md-12">
                        <form className="form">
                            <div className="form-group my-2">
                                <label htmlFor="title" className="sr-only">Title</label>
                                <textarea className="form-control-plaintext bg-danger text-light text-center" id="title" rows="1"
                                          style={{
                                              borderStyle: "inset",
                                              borderColor: "#000000",
                                              borderWidth: "1px",
                                          }} onChange={this.onChangeTitle} required>{this.state.title}</textarea>
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
                        <form>
                            <div className="form-group">
                                <label htmlFor="content" className="sr-only">Content</label>
                                <textarea className="form-control bg-dark text-light" style={{
                                    borderStyle: "solid",
                                    borderColor: "#000000",
                                    borderWidth: "2px",
                                    borderRadius: "10px"
                                }} id="content" rows="20" onChange={this.onChangeContent}>{this.state.content}</textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;