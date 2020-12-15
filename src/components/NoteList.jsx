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
        this.setActiveNote = this.setActiveNote.bind(this);
        this.getNotes = this.getNotes.bind(this);
        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.showArchiveModal = this.showArchiveModal.bind(this);
        this.closeArchiveModal = this.closeArchiveModal.bind(this);
        this.titleChangeCallback = this.titleChangeCallback.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.delete = this.delete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.createNote = this.createNote.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.archive = this.archive.bind(this);
        this.handleArchive = this.handleArchive.bind(this);

        this.state = {
            notes:  [],
            currentNote: null,
            currentIndex: -1,
            showCreateModal: false,
            showDeleteModal: false,
            showArchiveModal: false
        }
    }

    componentDidMount() {
        this.getNotes();
    }

    refreshList() {
        this.getNotes();
    }

    createNote(title) {
        let newNote = {
            id: null,
            title: title,
            content: "",
            createdAt: "",
            updatedAt: ""
        }

        console.log(newNote);

        NoteService
            .create(newNote)
            .catch(e => {
                console.log(e)
            });
    }

   handleCreate(title) {
        this.createNote(title);
        this.closeCreateModal();
        this.refreshList();
    }

    delete(id) {
        NoteService
            .delete(id)
            .then(() => {
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            })
    }

    archive(id) {
        let archivedNote = {
            title: this.state.currentNote.title
        };
        console.log("Archived");
        console.log(archivedNote);
        this.delete(id);
        ArchiveService
            .create(archivedNote)
            .then(() => {
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            })
    }

    handleDelete() {
        this.delete(this.state.currentNote.id);
        this.closeDeleteModal();
    }

    handleArchive() {
        this.archive(this.state.currentNote.id);
        this.closeArchiveModal();
    }

    showCreateModal() {
        this.setState({showCreateModal: true})
    };

    closeCreateModal() {
        this.setState({showCreateModal: false})
    };

    showDeleteModal() {
        this.setState({showDeleteModal: true})
    };

    closeDeleteModal() {
        this.setState({showDeleteModal: false})
    };

    showArchiveModal() {
        this.setState({showArchiveModal: true})
    };

    closeArchiveModal() {
        this.setState({showArchiveModal: false})
    };

    titleChangeCallback(changedTitle) {
        let newNotes = this.state.notes;
        newNotes[this.state.currentIndex].title = changedTitle
        this.setState({
            notes: newNotes
        })
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
            <div className="container-fluid overflow-hidden bg-secondary">
                <div className="row overflow-hidden" style={{
                    height: "750px",
                }}>
                    <div className="col-sm-4 h-100">
                        <div className="container bg-dark py-sm-2 h-100 my-3" style={{
                            borderStyle: "solid",
                            borderColor: "#000000",
                            borderRadius: "10px",
                            overflowY: "scroll"
                        }}>
                            <CreateModal close={this.closeCreateModal} show={this.state.showCreateModal} handleNoteCreate={this.handleCreate}/>
                            <ArchiveModal close={this.closeArchiveModal} show={this.state.showArchiveModal}
                                          title={this.state.currentNote ? (this.state.currentNote.title) : ("")}
                                          handleArchive={this.handleArchive}
                            />
                            <DeleteModal close={this.closeDeleteModal} show={this.state.showDeleteModal}
                                         title={this.state.currentNote ? (this.state.currentNote.title) : ("")}
                                         handleDelete={this.handleDelete}
                            />
                            <ul className="list-group">
                                <button type="button" className="btn btn-lg btn-info btn-block" onClick={this.showCreateModal}>+</button>
                                {this.state.notes.map((note, index) => (
                                        <button type="button" className="btn btn-secondary btn-block key" key={note.id}
                                                onClick={() => this.setActiveNote(note, index)}>
                                            {note.title}
                                            <button type="button" className="btn-sm btn-secondary float-right" onClick={() => this.showDeleteModal()}>
                                                x
                                            </button>
                                            <button type="button" className="btn-sm btn-secondary float-right" onClick={() => this.showArchiveModal()}>
                                                A
                                            </button>
                                        </button>
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