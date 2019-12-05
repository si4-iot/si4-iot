import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";
import Helmet from 'react-helmet'
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from 'react-redux';
import store from './store';


import Edit from "./components/edit.component";
import List from "./components/list.component";
import Read from "./components/read.component";
import Search from "./components/search.component";
import Result from "./components/result.component";
import Create from "./components/create.component";
import Add from "./components/add.component";

import logo from "./logo.png";

import favicon from "./icon.png";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Helmet>
            <title>si4IoT</title>
            <link rel="icon" type="image/png" href={favicon} />
          </Helmet>
          <div className="container">
            <div className="jumbotron blue-grey lighten-5" >
              <p className="card-title h1">Semantic Interoperability for Internet of Things</p>
              <p className="indigo-text my-4 font-weight-bold">Testando coleta e representação de dados de um sensor</p>
            </div>

            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
              <a className="navbar-brand" href="/">
                <img src={logo} width="90" height="30" alt="logo" className="d-inline-block align-top"/>
              </a>
              <div className="collpase nav-collapse" >
                <ul className="navbar-nav ml-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Listar</Link>
                  </li>
                  <li>
                    <Link to="/create" className="nav-link">Adicionar</Link>
                  </li>
                  <li>
                    <Link to="/add" className="nav-link">Adicionar URL</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/search" className="nav-link">Buscar</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <Route path="/" exact component={List} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/search" component={Search} />
            <Route path="/result" component={Result} />
            <Route path="/read/:id" component={Read} />
            <Route path="/create/" component={Create} />
            <Route path="/add/" component={Add} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
