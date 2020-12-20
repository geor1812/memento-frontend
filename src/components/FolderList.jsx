import React, { Component } from "react";
import FolderService from "../service/FolderService";
import {Link } from "react-router-dom";
import NoteService from "../service/NoteService";
class FolderList extends Component {
    constructor(props) {
        super(props);

        this.getFolders = this.getFolders.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.updateFolder = this.updateFolder.bind(this);
        this.refresh = this.refresh.bind(this);
        this.createFolder = this.createFolder.bind(this);

        this.state = {
            folders: [],
        }
    }

    componentDidMount() {
        this.getFolders();
    }

    refresh() {
        this.getFolders();
    }

    getFolders() {
        FolderService
            .getAll()
            .then((response)=>{
                this.setState({
                    folders: response.data
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    async onChangeTitle(index, e) {
        let newFolders = this.state.folders;
        newFolders[index].title = e.target.value;
        await this.setState({
            folders: newFolders
        });
        this.updateFolder(index);
    }

    updateFolder(index) {
        let folder = this.state.folders[index];
        FolderService
            .update(folder.id, folder)
            .catch(e => {
                console.log(e);
            })
    }

    deleteFolder(id) {
        FolderService
            .delete(id)
            .then(this.refresh)
            .catch(e => {
                console.log(e);
            })
    }

    createFolder() {
        let newFolder = {
            title: "New Folder",
            notes: []
        }

        FolderService
            .create(newFolder)
            .then(this.refresh)
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        return(
            <div className="container p-2">
                <div className="container mt-5 w-25">
                    <button className="btn btn-danger btn-lg btn-block" onClick={this.createFolder}>+</button>
                </div>
                <div className="row d-flex">
                    <div className={"col-md-auto mx-auto"}>
                        <ul className="list-unstyled row">
                                {this.state.folders.map((folder,index) => {
                                    return <div key={folder.id} className="card my-5 mx-auto" style={{width: "25rem"}}>
                                        <div className="container p-1 bg-dark">
                                            <button className="btn btn-dark float-right" onClick={() => this.deleteFolder(folder.id)}>X</button>
                                        </div>
                                        <div className="container p-1 bg-dark">
                                            <input className="form-control-plaintext text-center text-light bg-dark " type="text"
                                                   onChange={(e) => {this.onChangeTitle(index,e)}} value={folder.title} style={{fontSize: "1.7rem"}}/>
                                        </div>
                                        <Link
                                            to={"/notes/" + folder.id}
                                            className="card-body text-light text-center btn-dark"
                                            style={{height: "5rem"}}
                                        />
                                    </div>
                                })}
                        </ul>
                    </div>
                </div>

            </div>
        )
    }

}


export default FolderList;