import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//Redux Components
import { connect } from 'react-redux';
import { search } from '../actions/td.actions';
import PropTypes from 'prop-types';

//Exibicao de uma descricao
const Description = props => (
    <tr>
        <td>{props.desc.id}</td>
        <td>{props.desc.title}</td>
        <td>
            <Link to={"/edit/"+props.desc._id}>Editar</Link>
        </td>
        <td>
            <Link to={"/read/"+props.desc._id}>Visualizar</Link>
        </td>
    </tr>
)
class Result extends Component {
    
    descriptionList() {        
        const { description } = this.props.td;
        console.log('DESCRIpTION: '+description)
        if (description.length === 0){
            return (<div><p style={{color:"red"}}>Nenhuma descricao encontrada!</p></div>);
        }
        else {
            return description.map(function(currentDescription, i) {
                return <Description desc={currentDescription} key={i} />;
            });
        }
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <label>Dispositivos encontrados</label>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.descriptionList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

// Props do componente LIST:
Result.propTypes = {
    search: PropTypes.func.isRequired,
    td: PropTypes.object.isRequired
};

//Permite que o state usado no reducer seja mapeado no props do Componente
    //Faz refencia ao root reducer - index.js
const mapStateToProps = state => ( {
    td: state.td
});

export default connect( mapStateToProps, {search})(Result);