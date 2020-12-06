import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Note from "./components/Note";

function App() {
  return (
      <Router>
         <Navbar/>
        <div className="container-fluid h-100 bg-secondary">
            <div className="row">
                <div className="col-sm-4">
                    Note List goes here
                </div>
                <div className="col-md-8">
                    <Note/>
                </div>
            </div>
        </div>
      </Router>
  );
}

export default App;
