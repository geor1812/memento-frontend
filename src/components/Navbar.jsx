import {Link} from "react-router-dom";
import React, {Component} from "react";
import favicon from "../images/logo.ico"

class Navbar extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand d-inline-flex" href="/folders">
                    <input type="image" className="img-fluid ml-sm-3" width="50" height="50" src={favicon} alt="responsive logo"/>
                    <h3 className="mb-0 mt-2">emento</h3>
                </a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/folders"} className="nav-link">
                                Folders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/archive"} className="nav-link">
                                Archive
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;