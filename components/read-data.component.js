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
        var mqtt    = require('mqtt');
        var count =0;
        var client  = mqtt.connect("mqtt://192.168.1.157",{clientId:"mqttjs01"});
        console.log("connected flag  " + client.connected);

        //handle incoming messages
        client.on('message',function(topic, message, packet){
            console.log("message is "+ message);
            console.log("topic is "+ topic);
        });


        client.on("connect",function(){	
        console.log("connected  "+ client.connected);

        })
        //handle errors
        client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)});
        //publish
        function publish(topic,msg,options){
        console.log("publishing",msg);

        if (client.connected == true){
            
        client.publish(topic,msg,options);

        }
        count+=1;
        if (count==2) //ens script
            clearTimeout(timer_id); //stop timer
            client.end();	
        }

        //////////////

        var options={
        retain:true,
        qos:1};
        var topic="testtopic";
        var message="test message";
        var topic_list=["topic2","topic3","topic4"];
        var topic_o={"topic22":0,"topic33":1,"topic44":1};
        console.log("subscribing to topics");
        client.subscribe(topic,{qos:1}); //single topic
        client.subscribe(topic_list,{qos:1}); //topic list
        client.subscribe(topic_o); //object
        var timer_id=setInterval(function(){publish(topic,message,options);},5000);
        //notice this is printed even before we connect
        console.log("end of script");
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
                <h3>Sensores Disponiveis
                </h3>
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