import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import NoteList from "./components/NoteList";

function App() {
  return (
      <Router>
         <Navbar/>
         <NoteList/>
      </Router>
  );
}

export default App;
