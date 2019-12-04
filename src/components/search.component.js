import React, {Component} from 'react';

//Redux Components
import { connect } from 'react-redux';
import { search } from '../actions/td.actions';
import PropTypes from 'prop-types';


class Search extends Component {

    state = {
        texto: ''
    }
    
    onChangeTexto = e => {
        this.setState({ texto: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        console.log("submit : ")
        console.log(this.state.texto)

        //Fazendo uma nova consulta ao catalogo via search action
        this.props.search(this.state.texto);
        this.props.history.push('/result');
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Localizar TD's disponíveis </label>
                            <div className="formul">
                                <textarea className="texto-form" id="busca" rows="5" cols="100" 
                                value={this.state.texto}
                                onChange={this.onChangeTexto}></textarea>
                            </div>
                    </div>
                    <div className="form-group">
                        <div className="text-center">
                            <input type="submit" value="Buscar" className="btn btn-outline-dark" /> 
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

// Props do componente LIST:
Search.propTypes = {
    search: PropTypes.func.isRequired,
    td: PropTypes.object.isRequired
};

//Permite que o state usado no reducer seja mapeado no props do Componente
    //Faz refencia ao root reducer - index.js
const mapStateToProps = state => ( {
    td: state.td
});

export default connect( mapStateToProps, { search })(Search);