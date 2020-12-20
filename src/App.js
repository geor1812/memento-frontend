import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import FolderList from "./components/FolderList";
import NoteList from "./components/NoteList";

function App() {
  return (
      <Router>
         <Navbar/>
          <Switch>
              <Route
                  exact path={["/", "/folders"]}
                  component={FolderList}
              />

              <Route
                  exact path="/notes/:folderId"
                  component={() => <NoteList/>}
              />
          </Switch>
      </Router>
  );
}

export default App;
