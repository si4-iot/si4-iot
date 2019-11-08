import React, { Component } from 'react';
import axios from 'axios';

export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            super: [],
            catalogo: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:4000/super/'+this.props.match.params.id)
            .then(response => {
                this.setState({super: response.data});
                axios.get(this.state.super.url)
                    .then( res => {
                        console.log('Sucesso!!')
                        this.setState({catalogo: res.data});
                    })
                    .catch (function (err) {
                        console.log('Erro ao obter URL => ' + err)
                    })
            })
            .catch(function (error) {
                console.log('Erro ao visualizar => ' + error);
            })
    }
    
    
    printDevices(){
        return this.state.catalogo.map(function(current, i) {
            return <div><a href={current} className="links">{i} : {current}<br></br></a></div>
        });
    }
    
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <p>Devices encontrados no catálogo:</p>
                <table className="table" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.printDevices()}</td>
                        </tr>
                    </tbody>
                </table>        
            </div>
        )
    }
}