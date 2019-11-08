import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.onChangeTexto = this.onChangeTexto.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            texto: '',
            choice: [],
            description: [],
            catalogos: []
        }
        
        this._isMounted = false;

    }
    
    SideEffect(NullComponent) {
        this._isMounted = false;
        this.setState({description: []})
        axios.get('http://localhost:4000/super/')
            .then(response => {
                this.setState({catalogos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    componentDidMount() {
        this._isMounted = true;
        this.setState({description: []})
        axios.get('http://localhost:4000/super/')
            .then(response => {
                this.setState({catalogos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTexto(e) {
        this.setState({
            texto: e.target.value
        });
    }

    onChangeCheck(e){

    }

    
    getCatalogos(){
        return this.state.catalogos.map(function(current, i) {
            return (<div>
                        <input className="form-check-input" type="checkbox" id="defaultCheck1" 
                                value={i}
                                onChange={this.onChangeCheck}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">{current.url}</label>
                    </div>);
        });
    }

    onSubmit(e) {
        e.preventDefault();

//        const newData =  this.state.texto

        this.setState({
            texto: '',
            description: []
        })
    
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

        this.setState({
            texto: '',
            description: []
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <form onSubmit={this.onSubmit}>   
                    <div className="form-check">
                        <div className="panel-heading">Selecione entre os catalogos disponíveis: </div>
                        {this.getCatalogos()}
                    </div>
                    <div className="form-group">
                        <label>Defina sua consulta</label>
                            <div className="formul">
                                <textarea className="texto-form" id="busca" rows="5" cols="100" 
                                value={this.state.texto}
                                onChange={this.onChangeTexto}></textarea>
                            </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Buscar" className="btn btn-dark" />    
                    </div>
                </form>
                <Test description={this.state.description} />
            </div>
        )
    }
}
/*
                    <div className="panel panel-default">
                        <div className="panel-heading">Selecione entre os catalogos disponíveis</div>
                        <input type="checkbox" throwIfNamespace={this.state.choice} v-model="selected_catalog" />
                        <div class="panel-body">
                            <span>{this.getCatalogos()}</span>
                        </div>
                    </div>                 
*/
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