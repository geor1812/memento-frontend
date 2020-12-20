import React, { Component } from "react";
import FolderService from "../service/FolderService";
import {Link } from "react-router-dom";
class FolderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folders: [],
        }
    }

    componentDidMount() {
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

    render() {
        return(
            <div className="container p-2">
                <div className="container mt-5 w-25">
                    <button className="btn btn-danger btn-lg btn-block">+</button>
                </div>
                <div className="d-flex p-2">
                    {this.state.folders.map((folder) => {
                        return <div key={folder.id} className="card my-5 mx-auto" style={{width: "25rem"}}>
                            <div className="container p-1 bg-dark">
                                <button className="btn btn-dark float-right">X</button>
                            </div>
                            <div className="container p-1 bg-dark">
                                <input className="form-control-plaintext text-center text-light bg-dark " type="text"
                                       value={folder.title} style={{fontSize: "1.7rem"}}/>
                            </div>
                            <Link
                                to={"/notes/" + folder.id}
                                className="card-body text-light text-center btn-dark"
                                style={{height: "5rem"}}
                            />
                        </div>
                    })}
                </div>
            </div>
        )
    }

}


export default FolderList;