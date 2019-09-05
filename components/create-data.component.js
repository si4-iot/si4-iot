import React, {Component} from 'react';
import axios from 'axios';

export default class CreateData extends Component {

    constructor(props) {
        super(props);

        this.onChangeDataTemperature = this.onChangeDataTemperature.bind(this);
        this.onChangeDataHumidity = this.onChangeDataHumidity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            data_temperature: '',
            data_humidity: ''
        }
    }

    onChangeDataTemperature(e) {
        this.setState({
            data_temperature: e.target.value
        });
    }

    onChangeDataHumidity(e) {
        this.setState({
            data_humidity: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Data temperature: ${this.state.data_temperature}`);
        console.log(`Data humidity: ${this.state.data_humidity}`);

        const newData = {
            data_temperature: this.state.data_temperature,
            data_humidity: this.state.data_humidity
        }

        axios.post('http://localhost:4000/data/add', newData)
            .then(res => console.log(res.data));

        this.setState({
            data_temperature: '',
            data_humidity: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Adicionando dados</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Temperatura: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeDataTemperature}
                                />
                    </div>
                    <div className="form-group">
                        <label>Umidade: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeDataHumidity}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Data" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}