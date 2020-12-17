import React, {Component} from "react";
import NoteService from "../service/NoteService";
import Checklist from "./Checklist";

class Note extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.getNote = this.getNote.bind(this);
        this.itemChangeCallback = this.itemChangeCallback.bind(this);
        this.updateNote = this.updateNote.bind(this);

        this.state = {
            id : -1,
            title: "",
            content: "",
            createdAt: "",
            updatedAt: "",
            checklist: false,
            items : [],
            active: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.noteData) {
            if((!prevProps.noteData && this.props.noteData) || prevProps.noteData.id !== this.props.noteData.id) {
                this.getNote(this.props.noteData.id);
                console.log("Note change");
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
                    updatedAt: response.data.updatedAt.slice(0,10),
                    checklist: response.data.checklist,
                    items: response.data.items
                })
                console.log("Loaded note: ")
                console.log(response)
            })
            .catch(e=>{
                console.log(e);
            });
    }

    updateNote() {
        let currentNote = {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            createdAt: this.state.createdAt,
            updatedAt: this.state.updatedAt,
            checklist: this.state.checklist,
            items: this.state.items
        }

        NoteService
            .update(this.state.id, currentNote)
            .catch((e) => {
                console.log(e);
            })
    }

    async onChangeTitle(e) {
        await this.setState({
            title: e.target.value
        })
        this.updateNote();
        this.props.titleCallback(this.state.title);
    }

    async onChangeContent(e) {
        await this.setState({
            content: e.target.value
        });
        this.updateNote()
    }

    async itemChangeCallback(items) {
       await this.setState({
            items: items
        });
        this.updateNote();
    }

    render() {
        return(
            <div className="container my-3 bg-dark" style={{
                borderStyle: "solid",
                borderColor: "#000000",
                borderRadius: "10px",
                height: "750px"
            }}>
                {this.state.id !== -1 ? (
                    <div>
                        <div className="container bg-secondary p-sm-3 mt-sm-3">
                            <div className="row m-3 bg-dark p-1" style={{
                                borderStyle: "hidden",
                                borderColor: "#000000",
                                borderRadius: "5px",
                                borderWidth: "2px",
                            }}>
                                <div className="col-md-12">
                                    <form className="form">
                                        <div className="form-group my-2">
                                            <label htmlFor="title" className="sr-only">Title</label>
                                            <textarea className="form-control-plaintext mx-auto w-50 bg-danger text-light text-center" id="title" rows="1"
                                                      style={{
                                                          borderStyle: "inset",
                                                          borderColor: "#000000",
                                                          borderWidth: "1px",
                                                      }} onChange={this.onChangeTitle} value={this.state.title} required/>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm text-light">
                                                    <p className="mb-0">Type:</p>
                                                    <i>{this.state.checklist ? ("Checklist"):("Note")}</i>
                                                </div>
                                                <div className="col-sm text-light">
                                                    <p className="mb-0">Created on: </p>
                                                    <i>{this.state.createdAt}</i>
                                                </div>
                                                <div className="col-sm text-light">
                                                    <p className="mb-0">Last modified on: </p>
                                                    <i>{this.state.updatedAt}</i>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    <div className="container bg-secondary p-sm-3 mb-sm-3">
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.checklist ? (<Checklist items={this.state.items} itemChange={this.itemChangeCallback}/>):(<form>
                                    <div className="form-group">
                                        <label htmlFor="content" className="sr-only">Content</label>
                                        <textarea className="form-control bg-dark text-light" style={{
                                            borderStyle: "solid",
                                            borderColor: "#000000",
                                            borderWidth: "2px",
                                            borderRadius: "5px"
                                        }} id="content" rows="19" onChange={this.onChangeContent} value={this.state.content ? (this.state.content) : ("")}/>
                                    </div>
                                </form>)}
                            </div>
                        </div>
                    </div>
                </div>
                ):(
                    <div className="d-flex justify-content-center">
                        <h4 className="text-light">Select a note to get started</h4>
                    </div>
                )}

            </div>
        )
    }
}

export default Note;