import React, {Component} from 'react';
import axios from 'axios';

export default class CreateDesc extends Component {

    constructor(props) {
        super(props);

        this.onChangeURL = this.onChangeURL.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            url: ''
        }
    }

    onChangeURL(e) {
        this.setState({
            url: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        var url = this.state.url
        console.log(`Form submitted: ` + url);
        
        axios.post('http://localhost:4000/super/add', this.state) 
                .then (res => {
                    console.log("Catalogo adicionado!")
                    console.log(res.data)
                })
                .catch (function (err) {
                    console.log("Erro ao armazenar: " + err);
                })  
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <p>Adicionar Catalogo</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-sm-7 my-1">
                            <label className="sr-only" htmlFor="inlineFormInput">URL</label>
                            <input type="text" 
                            className="form-control" 
                            id="inlineFormInput" 
                            placeholder="http://localhost/"
                            value={this.state.url}
                            onChange={this.onChangeURL} 
                            />
                        </div>
                        <div className= "col-auto">
                            <input type="submit" value="Adicionar" className="btn btn-dark" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}