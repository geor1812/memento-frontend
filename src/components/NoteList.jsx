import React, { Component } from "react";

import NoteService from "../service/NoteService";
import CreateModal from "./modals/CreateModal";
import Note from "./Note";

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.getNotes = this.getNotes.bind(this);
        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);

        this.state = {
            notes:  [],
            currentNote: null,
            currentIndex: -1,
            showCreateModal: false
        }
    }

    componentDidMount() {
        this.getNotes();
    }

    showCreateModal() {
        this.setState({showCreateModal: true})
    };

    closeCreateModal() {
        this.setState({showCreateModal: false})
    };

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
                        <div className="container bg-dark py-sm-2 h-100 my-3 overflow-auto " style={{
                            borderStyle: "solid",
                            borderColor: "#000000",
                            borderRadius: "10px",
                        }}>
                            <CreateModal close={this.closeCreateModal} show={this.state.showCreateModal}/>
                            <ul className="list-group">
                                <button type="button" className="btn btn-lg btn-info btn-block" onClick={this.showCreateModal}>+</button>
                                {this.state.notes.map((note, index) => (
                                    <button type="button" className="btn btn-secondary btn-lg btn-block"
                                            onClick={() => this.setActiveNote(note, index)}>
                                        {note.title}
                                    </button>
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