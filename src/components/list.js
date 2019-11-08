import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Super = props => (
    <tr>
        <td>{props.super.url}</td>
        <td>
            <Link to={"/view/"+props.super._id} className="links">Visualizar</Link>
        </td>
    </tr>
)

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {super: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/super/')
            .then(response => {
                this.setState({super: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/super/')
        .then(response => {
            this.setState({super: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    descriptionList() {
        return this.state.super.map(function(current, i) {
            return <Super super={current} key={i} />;
        });
    }

    render() {
        return (
            <div style={{ marginTop: 20}}>
                <h3>Catálogo</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.descriptionList() }
                    </tbody>
                </table>
            </div>
        )
    }
}