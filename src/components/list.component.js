import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Description = props => (
    <tr>
        <td>{props.description.id}</td>
        <td>{props.description.title}</td>
        <td>
            <Link to={"/edit/"+props.description._id}>Editar</Link>
        </td>
        <td>
            <Link to={"/read/"+props.description._id}>Visualizar</Link>
        </td>
    </tr>
)

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {description: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/td/')
            .then(response => {
                this.setState({description: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/td/')
        .then(response => {
            this.setState({description: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    descriptionList() {
        return this.state.description.map(function(currentDescription, i) {
            return <Description description={currentDescription} key={i} />;
        });
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Catálogo</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
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