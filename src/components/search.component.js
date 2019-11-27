import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.onChangeTexto = this.onChangeTexto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            texto: '',
            description: []
        }
        
        this._isMounted = false;
    }
    
    componentWillUnmount() {
        this._isMounted = false;
        this.setState({description: []})
    }
    
    componentDidMount() {
        this._isMounted = true;
        this.setState({description: []})
    }

    onChangeTexto(e) {
        this.setState({
            texto: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:4000/td/search', this.state.texto)
            .then(res => {
                this.setState({
                    texto: this.state.texto,
                    description: [res.data]})
                console.log('Query sended: ' + this.state.texto)
                console.log('Query result: ' + res.data)
            })
            .catch(function (error) {
                console.log('Falha ao localizar: ' + error);
            })

        this.setState({
            texto: '',
            description: []
        })
    }

    

    render() {
        return (
            <div style={{marginTop: 20}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Localizar TD's disponíveis </label>
                            <div class="formul">
                                <textarea class="texto-form" id="busca" rows="5" cols="100" 
                                value={this.state.texto}
                                onChange={this.onChangeTexto}></textarea>
                            </div>
                    </div>
                    <div className="form-group">
                        <div class="text-center">
                            <input type="submit" value="Buscar" className="btn btn-outline-dark" />    
                        </div>
                    </div>
                </form>
                <Test description={this.state.description} />
            </div>
        )
    }
}

const Description = props => (
    <tr>
        <td>{props.description.id}</td>
        <td>{props.description.title}</td>
        <td>
            <Link to={"/edit/"+props.description._id}>Editar</Link>
        </td>
        <td>
            <Link to={"/read/"+props.description._id}>Visualizar</Link>
        </td>
    </tr>
)

class Test extends Component {
    
    descriptionList() {
        return this.props.description.map(function(currentDescription, i) {
            return currentDescription.map(function(des, index) {
                return <Description description={des} key={index} />;
            })
        });
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