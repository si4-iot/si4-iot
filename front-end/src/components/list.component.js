import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { get } from '../actions/td.actions';
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

class List extends Component {

    //Faz o request das descricoes ao servidor através da action GET:
    componentDidMount() {
        this.props.get();
    }

    //Lista as descricoes contidas no vetor description do state:
    descriptionList() {
        const { descriptions } = this.props.td;
        return descriptions.map(function(currentDescription, i) {
             return <Description desc={currentDescription} key={i} />;
        });
    }

    //Rendeniza o component:
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Catálogo</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.descriptionList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

// Props do componente LIST:
List.propTypes = {
    get: PropTypes.func.isRequired,
    td: PropTypes.object.isRequired
};

//Permite que o state usado no reducer seja mapeado no props do Componente
    //Faz refencia ao root reducer - index.js
const mapStateToProps = state => ( {
    td: state.td
});

export default connect( mapStateToProps, { get })(List);