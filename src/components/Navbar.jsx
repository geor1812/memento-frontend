import {Link} from "react-router-dom";
import React, {Component} from "react";

class Navbar extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/notes">Memento</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;