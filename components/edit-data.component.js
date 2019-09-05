import React, {Component} from 'react';
import axios from 'axios';

export default class EditData extends Component {

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

    componentDidMount() {
        axios.get('http://localhost:4000/data/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    data_temperature: response.data.data_temperature,
                    data_humidity: response.data.data_humidity
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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
        const obj = {
            data_temperature: this.state.data_temperature,
            data_humidity: this.state.data_humidity,
        };
        axios.post('http://localhost:4000/data/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Update dos dados</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Temperatura: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.data_temperature}
                                onChange={this.onChangeDataTemperature}
                                />
                    </div>
                    <div className="form-group">
                        <label>Umidade: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.data_humidity}
                                onChange={this.onChangeDataHumidity}
                                />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Data" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}