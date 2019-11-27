import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";
import Helmet from 'react-helmet'
import "bootstrap/dist/css/bootstrap.min.css";


import Edit from "./components/edit.component";
import List from "./components/list.component";
import Read from "./components/read.component";
import Search from "./components/search.component";
import Create from "./components/create.component";
import Add from "./components/add.component";

import logo from "./logo.png";

class App extends Component {

  render() {
    return (
      <Router>
        <Helmet>
          <title>si4IoT</title>
          <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
        </Helmet>
        <div className="container">
          <div className="jumbotron blue-grey lighten-5" >
            <p className="card-title h1">Semantic Interoperability for Internet of Things</p>
            <p class="indigo-text my-4 font-weight-bold">Testando coleta e representação de dados de um sensor</p>
          </div>

          <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <a class="navbar-brand" href="/">
              <img src={logo} width="90" height="30" alt="logo" class="d-inline-block align-top"/>
            </a>
            <div class="collpase nav-collapse" >
              <ul class="navbar-nav ml-auto">
                <li class="navbar-item">
                  <Link to="/" class="nav-link">Listar</Link>
                </li>
                <li>
                  <Link to="/create" class="nav-link">Adicionar</Link>
                </li>
                <li>
                  <Link to="/add" class="nav-link">Adicionar URL</Link>
                </li>
                <li class="navbar-item">
                  <Link to="/search" class="nav-link">Buscar</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={List} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/search" component={Search} />
          <Route path="/read/:id" component={Read} />
          <Route path="/create/" component={Create} />
          <Route path="/add/" component={Add} />
        </div>
      </Router>
    );
  }
}

export default App;
