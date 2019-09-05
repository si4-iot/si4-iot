import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Data = props => (
    <tr>
        <td>{props.data.data_temperature}</td>
        <td>{props.data.data_humidity}</td>
        <td>
            <Link to={"/edit/"+props.data._id}>Editar</Link>
        </td>
    </tr>
)

export default class DataList extends Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/data/')
            .then(response => {
                this.setState({data: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/data/')
        .then(response => {
            this.setState({data: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    dataList() {
        return this.state.data.map(function(currentData, i) {
            return <Data data={currentData} key={i} />;
        });
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Dados monitorados</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Temperatura</th>
                            <th>Humidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.dataList() }
                    </tbody>
                </table>
            </div>
        )
    }
}