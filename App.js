import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateData from "./components/create-data.component";
import EditData from "./components/edit-data.component";
import DataList from "./components/data-list.component";
import CreateDesc from "./components/create-desc.component";
import DescList from "./components/desc-list.component";
import EditDesc from "./components/edit-desc.component";
import ReadDesc from "./components/read-desc.component"

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <div class="jumbotron blue-grey lighten-5" >
            <h2 class="card-title h1">Semantic Interoperability for Internet of Things</h2>
            <p class="indigo-text my-4 font-weight-bold">Testando coleta e representação de dados de um sensor</p>
          </div>

          <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <a class="navbar-brand" href="/">
              <img src={logo} width="90" height="30" alt="logo" class="d-inline-block align-top"/>
            </a>
            <div className="collpase nav-collapse" >
              <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Dados monitorados</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Adicionar dado</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createDesc" className="nav-link">Adicionar TD</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={DataList} />
          <Route path="/" exact component={DescList} />
          <Route path="/edit/:id" component={EditData} />
          <Route path="/editDesc/:id" component={EditDesc} />
          <Route path="/create" component={CreateData} />
          <Route path="/createDesc" component={CreateDesc} />
          <Route path="/readDesc/:id" component={ReadDesc} />
        </div>
      </Router>
    );
  }
}

export default App;
