import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Helmet from 'react-helmet';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import List from "./components/list";
import View from "./components/view";
import Add from "./components/add";
import Search from "./components/search";

import logo from "./logo.svg";
import favicon from "./favicon.png"

class App extends Component {
  render() {
    return (
        <Router>
            <Helmet>
                <title>SC</title>
                <link rel="icon" type="image/png" href={favicon} size="40x30" />
                <style>{'body { background-color: whitesmoke; }'}</style>
            </Helmet>
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                    <a className="navbar-brand" href="https://www.facebook.com/Roma.hamed.44" target="_blank" rel="noopener noreferrer">
                        <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
                    </a>
                    <Link to="/" className="navbar-brand">Super Catalogo</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/add" className="nav-link">Novo catalogo</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/search" className="nav-link">Fazer consulta</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={List} />
                <Route path="/view/:id" component={View} />
                <Route path="/add" component={Add} />
                <Route path="/search" component={Search} />
            </div>
        </Router>
    );
  }
}

export default App;
