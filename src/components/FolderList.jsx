import React, { Component } from "react";

import NoteService from "../service/NoteService";
import CreateModal from "./modals/CreateModal";
import Note from "./Note";
import DeleteModal from "./modals/DeleteModal";
import ArchiveModal from "./modals/ArchiveModal";
import ArchiveService from "../service/ArchiveService";

class NoteList extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        return(
            <div className="container-fluid overflow-hidden bg-secondary">
                <div className="row overflow-hidden" style={{
                    height: "750px",
                }}>
                    <div className="col-sm-4 h-100">
                        <div className="container bg-dark py-sm-2 h-100 my-3" style={{
                            borderStyle: "solid",
                            borderColor: "#000000",
                            borderRadius: "5px",
                            overflowY: "scroll"
                        }}>
                            <CreateModal close={this.closeCreateModal} show={this.state.showCreateModal}
                                         handleNoteCreate={this.handleNoteCreate}/>
                            <ArchiveModal close={this.closeArchiveModal} show={this.state.showArchiveModal}
                                          title={this.state.currentNote ? (this.state.currentNote.title) : ("")}
                                          handleArchive={this.handleArchive}
                            />
                            <DeleteModal close={this.closeDeleteModal} show={this.state.showDeleteModal}
                                         title={this.state.currentNote ? (this.state.currentNote.title) : ("")}
                                         handleDelete={this.handleDelete}
                            />
                            <ul className="list-group">
                                <form className="form p-sm-2 bg-secondary mb-sm-2" onSubmit={(e => e.preventDefault())}
                                      style={{
                                          borderStyle: "solid",
                                          borderColor: "#000000",
                                          borderRadius: "5px"}}>
                                    <input type="text" className="form-control btn-outline-danger text-light bg-dark mr-sm-2"
                                           value={this.state.searchTerm} placeholder="Search..." onChange={this.onChangeSearchTerm}/>
                                </form>
                                <button type="button" className="btn btn-lg btn-info btn-block" onClick={this.showCreateModal}>+</button>
                                {this.state.notes.map((note, index) => (
                                    <li type="button" className="btn btn-secondary btn-block key" key={note.id}
                                        onClick={() => this.setActiveNote(note, index)}>
                                        {note.title}
                                        <button type="button" className="btn-sm btn-secondary float-right" onClick={() => this.showDeleteModal()}>
                                            x
                                        </button>
                                        <button type="button" className="btn-sm btn-secondary float-right" onClick={() => this.showArchiveModal()}>
                                            A
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8 h-100">
                        <Note titleCallback={this.titleChangeCallback} noteData={this.state.currentNote}/>
                    </div>
                </div>
            </div>
        )
    }

}


export default NoteList;