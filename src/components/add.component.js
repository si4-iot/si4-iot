import React, {Component} from 'react';
import axios from 'axios';

export default class CreateDesc extends Component {

    constructor(props) {
        super(props);

        this.onChangeURL = this.onChangeURL.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeURLS = this.onChangeURLS.bind(this);
        this.onSubmitMulti = this.onSubmitMulti.bind(this);

        this.state = {
            url: '',
            urls:'',
            description: {},
            multidescription: []
        }
    }

    onChangeURL(e) {
        this.setState({
            url: e.target.value
        });
    }

    onChangeURLS(e) {
        this.setState({
            urls: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        var url = this.state.url

        console.log(`Adicionando um TD: ` + url);

        axios.get(url)
            .then(response => {
                this.setState({description: response.data});
                console.log('Descricao encontrada!')
                axios.post('http://localhost:4000/td/add', this.state.description)
                    .then(res => console.log(res.data))
                    .catch(function (error) {
                        console.log('Falha ao armazenar: ' + error);
                    })
            })
            .catch(function (error) {
                console.log('Erro ao obter URL');
            })
        

    }

    onSubmitMulti(e) {
        e.preventDefault();

        var urls = this.state.urls

        console.log(`Form submitted: ` + urls);

        axios.get(urls)
            .then(response => {
                this.setState({multidescription: response.data});
                console.log('URL encontrada!')
                console.log('Qtd de dispositivos: '+ this.state.multidescription.length)
                this.state.multidescription.map(function(currentDescription, i) {
                    var desc = ''
                    console.log('Thing: '+currentDescription)
                    var ar = currentDescription.split('/')
                    currentDescription = 'http://ec2-3-16-213-52.us-east-2.compute.amazonaws.com:8080/' + ar.pop()
                    axios.get(currentDescription)
                        .then(response => {
                            console.log('Descricao: ' + desc)
                            desc =  response.data
                            axios.post('http://localhost:4000/td/add', desc)
                                .then(res => {
                                    console.log('Thing adicionada!')
                                    console.log(res.data)
                                })
                                .catch(function (error) {
                                    console.log('Falha ao armazenar: ' + error);
                                })
                        })
                        .catch(function (error) {
                            console.log('Erro ao obter Descricao');
                        })
                    return 0;
                })
            })
            .catch(function (error) {
                console.log('Erro ao obter URL');
            })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Adicionar TD</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>URL:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.url}
                                onChange={this.onChangeURL}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Adicionar" className="btn btn-primary" />
                    </div>
                </form>
                <br></br><hr></hr><br></br>
                <h3>Multiplas TD's</h3>
                <form onSubmit={this.onSubmitMulti}>
                    <div className="form-group">
                        <label>URL:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.urls}
                                onChange={this.onChangeURLS}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Adicionar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}