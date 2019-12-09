import React, {Component} from 'react';
import axios from 'axios';


//React Components
import { connect } from 'react-redux';
import { add } from '../actions/td.actions';
import PropTypes from 'prop-types';

class Add extends Component {

    state = {
        url: '',
        urls:'',
        description: {},
        multidescription: []
    }

    onChangeURL = e => {
        this.setState({ url: e.target.value });
    };

    onChangeURLS = e => {
        this.setState({ urls: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        var url = this.state.url

        console.log(`Adicionando um TD: ` + url);

        axios.get(url)
            .then(response => {
                this.setState({description: response.data});
                console.log('Descricao encontrada!')
                //Adicionando nova descricao via add action
                this.props.add(this.state.description);
            })
            .catch(function (error) {
                console.log('Erro ao obter URL');
            })
    }

    onSubmitMulti = e => {
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
                    console.log(currentDescription)
                    axios.get(currentDescription)
                        .then(response => {
                            desc =  response.data
                            //Adicionando nova descricao via add action
                            this.props.add(desc);
                            console.log('Descricao adicionada: ' + desc)
                        })
                        .catch(function (error) {
                            console.log('Erro ao obter Descricao '+error);
                        })
                    return 0;
                })
            })
            .catch(function (error) {
                console.log('Erro ao obter URL'+error);
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

// Props do componente LIST:
Add.propTypes = {
    add: PropTypes.func.isRequired,
    td: PropTypes.object.isRequired
};

//Permite que o state usado no reducer seja mapeado no props do Componente
    //Faz refencia ao root reducer - index.js
const mapStateToProps = state => ( {
    td: state.td
});

export default connect( mapStateToProps, { add })(Add);