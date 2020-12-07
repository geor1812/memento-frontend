import React, {Component} from "react";
import NoteService from "../service/NoteService";

class Note extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.getNote = this.getNote.bind(this);

        this.state = {
            id : -1,
            title: "",
            content: "",
            createdAt: "",
            updatedAt: "",
            active: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.noteData) {
            if((!prevProps.noteData && this.props.noteData) || prevProps.noteData.id !== this.props.noteData.id) {
                this.getNote(this.props.noteData.id);
                console.log("Change");
            }
        }
    }

    getNote(id) {
        NoteService
            .getById(id)
            .then((response)=> {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    content: response.data.content,
                    createdAt: response.data.createdAt.slice(0,10),
                    updatedAt: response.data.updatedAt.slice(0,10)
                })
                console.log("Loaded note: ")
                console.log(response)
            })
            .catch(e=>{
                console.log(e);
            });
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
            <div className="container my-3" style={{
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
                                          }} onChange={this.onChangeTitle} value={this.state.title} required/>
                            </div>
                            <div className="container">
                                    <div className="row">
                                        <div className="col-sm text-light">
                                            <p>Created on: </p>
                                            <i>{this.state.createdAt}</i>
                                        </div>
                                        <div className="col-sm text-light">
                                            <p>Last modified on: </p>
                                            <i>{this.state.updatedAt}</i>
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
                                }} id="content" rows="19" onChange={this.onChangeContent} value={this.state.content}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;