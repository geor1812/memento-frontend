import React, { Component } from "react";

import NoteService from "../service/NoteService";
import CreateModal from "./modals/CreateModal";
import Note from "./Note";
import DeleteModal from "./modals/DeleteModal";
import ArchiveModal from "./modals/ArchiveModal";
import ArchiveService from "../service/ArchiveService";
import FolderService from "../service/FolderService";
import { withRouter  } from "react-router";
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
        this.handleNoteCreate = this.handleNoteCreate.bind(this);
        this.archive = this.archive.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            folderId: this.props.match.params.folderId,
            notes:  [],
            currentNote: null,
            currentIndex: -1,
            showCreateModal: false,
            showDeleteModal: false,
            showArchiveModal: false,
            searchTerm: ""
        }
    }

    componentDidMount() {
        this.getNotes();
    }

    refreshList() {
        this.getNotes();
    }

    createNote(title, checklist) {
        let newNote = {
            id: null,
            title: title,
            content: "",
            createdAt: "",
            updatedAt: "",
            checklist : checklist,
            items: []
        }

        console.log(newNote);

        NoteService
            .create(this.state.folderId, newNote)
            .then(()=>{
                this.refreshList()
            })
            .catch(e => {
                console.log(e)
            });
    }

    handleNoteCreate(title, checklist) {
        this.closeCreateModal();
        this.createNote(title, checklist);
        this.setState({
            currentNote: null,
            currentIndex: -1
        })
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
        this.closeDeleteModal();
        this.delete(this.state.currentNote.id);
        this.setState({
            currentNote: null,
            currentIndex: -1
        })
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

    async onChangeSearchTerm(e) {
        await this.setState({
            searchTerm: e.target.value
        })
        this.search(this.searchTerm);
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

    search() {
        NoteService
            .getWithSearch(this.state.searchTerm)
            .then((response)=>{
                this.setState({
                    notes: response.data
                })
            })
            .catch(e => {
                console.log(e);
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


export default withRouter(NoteList);