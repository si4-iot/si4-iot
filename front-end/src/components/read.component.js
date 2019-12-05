import React, {Component} from 'react';

import { connect } from 'react-redux';
import { getTD } from '../actions/td.actions';
import PropTypes from 'prop-types';
 
class Read extends Component {

    state = {
        description: []
    };
    
    componentDidMount() {
        this.props.getTD(this.props.match.params.id);
    }

    printContext(description){
        for(var aux in description) {
            if (aux === "@context"){
                return JSON.stringify(description[aux]);  
            }
        }
    }

    render() {
        const { description } = this.props.td;
        //let aux;
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Thing Description:</h3>
                <table className="table table-striped " style={{ marginTop: 20 }}>
                    <thead className="table-primary">
                        <tr>
                            <th>Context</th>
                            <th>ID</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.printContext(description)}</td>
                            <td>{description.id}</td>
                            <td>{description.title}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table className="table table-striped " style={{ marginTop: 20 }}>
                    <thead className="table-primary">
                        <tr>
                            <th>Security Definitions</th>
                            <th>Security</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{JSON.stringify(description.securityDefinitions, null)}</td>
                            <td>{JSON.stringify(description.security, null)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table className="table table-striped " style={{ marginTop: 20 }}>
                    <thead className="table-primary">
                        <tr>
                            <th>Properties</th>
                            <th>Actions</th>
                            <th>Events</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{JSON.stringify(description.properties,null)}</td>
                            <td>{JSON.stringify(description.actions, null)}</td>
                            <td>{JSON.stringify(description.events, null)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


// Props do componente LIST:
Read.propTypes = {
    getTD: PropTypes.func.isRequired,
    td: PropTypes.object.isRequired
};

//Permite que o state usado no reducer seja mapeado no props do Componente
    //Faz refencia ao root reducer - index.js
const mapStateToProps = state => ( {
    td: state.td
});

export default connect( mapStateToProps, { getTD })(Read);