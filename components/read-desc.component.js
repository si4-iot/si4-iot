import React, {Component} from 'react';
import axios from 'axios';

const Description = props => (
    <tr>
        <td>{props.description.name}</td>
        <td>{props.description.title}</td>
        <td>{props.description.desc}</td>
        <td>{props.description.body}</td>
    </tr>
)

export default class ReadDesc extends Component {

    constructor(props) {
        super(props);
        this.state = {description: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4999/description/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    title: response.data.title,
                    desc: response.data.desc,
                    body: response.data.body
                })
            })
            .catch(function(error) {
                console.log(error)
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
                            <th>TD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ul>
                            {this.state.props.map(this.props.match.params.id , (
                                <li key={this.props.match.params.id}>key</li>
                            ))}
                        </ul>
                    </tbody>
                </table>
            </div>
        )
    }
}