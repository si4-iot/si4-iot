import React, {Component} from 'react';
import axios from 'axios';

export default class CreateDesc extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            title: '',
            desc: '',
            body: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDesc(e) {
        this.setState({
            desc: e.target.value
        });
    }

    onChangeBody(e) {
        this.setState({
            body: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);

        const newDescriction = {
            name: this.state.name,
            title: this.state.title,
            desc: this.state.desc,
            body: this.state.body
        }

        axios.post('http://localhost:4900/description/add', newDescriction)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            title: '',
            desc: '',
            body: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Adicionar TD</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Nome: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Titulo: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Descrição: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.desc}
                                onChange={this.onChangeDesc}
                                />
                    </div>
                    <div className="form-group">
                        <label>TD: </label>
                        <textarea type="text"
                                className="form-control"
                                value={this.state.body}
                                onChange={this.onChangeBody}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Criar TD" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}