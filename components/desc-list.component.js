import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Description = props => (
    <tr>
        <td>{props.description.name}</td>
        <td>{props.description.title}</td>
        <td>{props.description.desc}</td>
        <td>
            <Link to={"/editDesc/"+props.description._id}>Editar</Link>
        </td>
        <td>
            <Link to={"/readDesc/"+props.description._id}>Visualizar</Link>
        </td>
    </tr>
)

export default class DescList extends Component {

    constructor(props) {
        super(props);
        this.state = {description: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4999/description/')
            .then(response => {
                this.setState({description: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4999/description/')
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
                            <th>Nome</th>
                            <th>Titulo</th>
                            <th>Descrição</th>
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