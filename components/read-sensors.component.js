import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ReadData extends Component {

    constructor(props) {
        super(props);

        this.onChangeDataTemperature = this.onChangeDataTemperature.bind(this);
        this.onChangeDataHumidity = this.onChangeDataHumidity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            data_temperature: '',
            data_humidity: ''
        }
        const coap  = require('coap') // or coap
            , req   = coap.request('coap://192.168.0.24/dht11')

        req.on('response', function(res) {
        res.pipe(process.stdout)
        })

        req.end()
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

    onclick1(){       
        const coap  = require('coap') // or coap
            , req   = coap.request('coap://192.168.0.24/lightled')
        
        req.method = 'POST'
        
        req.on('response', function(res) {
            console.log(response);
            document.getElementById("button1").style.backgroundColor = "#5c8a8a";
            document.getElementById("button1").style.color = "white";
            document.getElementById("button2").style.backgroundColor = "white";
            document.getElementById("button2").style.color = "black";
            document.getElementById("button3").style.backgroundColor = "white";
            document.getElementById("button3").style.color = "black";
            console.log("LED Turned Always On", "success");
            res.pipe(process.stdout)
        })

        req.end()
    };

    onclick2(){
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://myIP:3030/LED",
          "method": "PUT",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "e985f6da-eebd-d2e3-36e3-3c040f9771a7"
          },
          "processData": false,
          "data": "{\n\t\"LEDstate\":\"NNNNNN\"\n}"
        }
    
        $.ajax(settings).done(function (response) {
          console.log(response);
          document.getElementById("button1").style.backgroundColor = "white";
          document.getElementById("button1").style.color = "black";
          document.getElementById("button2").style.backgroundColor = "#5c8a8a";
          document.getElementById("button2").style.color = "white";
          document.getElementById("button3").style.backgroundColor = "white";
          document.getElementById("button3").style.color = "black";
          $.notify("LED Turned Always Off", "success");
        });
    };

    onclick3(){
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://myIP:3030/LED",
          "method": "PUT",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "e985f6da-eebd-d2e3-36e3-3c040f9771a7"
          },
          "processData": false,
          "data": "{\n\t\"LEDstate\":\"AAAAAA\"\n}"
        }
    
        $.ajax(settings).done(function (response) {
          console.log(response);
          document.getElementById("button1").style.backgroundColor = "white";
          document.getElementById("button1").style.color = "black";
          document.getElementById("button2").style.backgroundColor = "white";
          document.getElementById("button2").style.color = "black";
          document.getElementById("button3").style.backgroundColor = "#5c8a8a";
          document.getElementById("button3").style.color = "white";
          showAlert = 1;
          $.notify("LED Turned Auto Detect Mode", "success");
        });
    };

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Sensores Disponiveis
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>DHT 11: </label>
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
                    
                    <div class="col-md-4 led">
                        <div class="nameLED">LED Display & Switch</div>
                            <svg id="pic1" viewbox="-50 -50 100 100">
                                <circle id="circle1" cx="0" cy="0" r="40"> </circle>
                            </svg>
                        <div class="buttons">
                            <div class="button1" onclick="onclick1()" id="button1">ON</div>
                            <div class="button2" onclick="onclick2()" id="button2">OFF</div>
                            <div class="button3" onclick="onclick3()"  id="button3">AUTO</div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Data" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}