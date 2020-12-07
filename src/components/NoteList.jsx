import React, { Component } from "react";
import NoteService from "../service/NoteService";
import { Link } from "react-router-dom";
import Note from "./Note";

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.getNotes = this.getNotes.bind(this);
        this.state = {
            notes:  [],
            currentNote: null,
            currentIndex: -1
        }
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        NoteService
            .getAll()
            .then((response)=>{
                this.setState({
                    notes: response.data
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    setActiveNote(note, index) {
        this.setState({
            currentNote: note,
            currentIndex: index
        })
    }

    render() {

        return(
            <div className="container-fluid h-100 bg-secondary">
                <div className="row h-100">
                    <div className="col-sm-4 h-100">
                        <div className="container py-sm-2 h-100 my-3 overflow-auto " style={{
                            borderStyle: "solid",
                            borderColor: "#000000",
                            borderRadius: "10px",
                        }}>
                            <ul className="list-group">
                                {this.state.notes.map((note, index) => (
                                    <li className={"list-group-item text-light" + (index === this.state.currentIndex ? " bg-dark" : " bg-secondary")}
                                        key={index}
                                        style={{borderStyle: "solid", borderRadius: "10px",
                                            borderWidth: "1px", borderColor: "#202020"}}
                                        onClick={() => this.setActiveNote(note, index)}>
                                        {note.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8 h-100">
                        <Note noteData={this.state.currentNote}/>
                    </div>
                </div>
            </div>
        )
    }

}


export default NoteList;