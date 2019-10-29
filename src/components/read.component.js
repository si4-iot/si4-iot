import React, {Component} from 'react';
import axios from 'axios';

export default class Read extends Component {

    constructor(props) {
        super(props);
        this.state = {description: []};
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/td/'+this.props.match.params.id)
            .then(response => {
                this.setState({description: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    printProperties(){
        
        
        return JSON.stringify(this.state.description.properties,null);
    }
    printActions(){

    }
    printEvents(){

    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Thing Description:</h3>
                <table class="table table-striped " style={{ marginTop: 20 }}>
                    <thead class="table-primary">
                        <tr>
                            <th>Context</th>
                            <th>ID</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{JSON.stringify(this.state.description.context,null)    }</td>
                            <td>{this.state.description.id}</td>
                            <td>{this.state.description.title}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table class="table table-striped " style={{ marginTop: 20 }}>
                    <thead class="table-primary">
                        <tr>
                            <th>Security Definitions</th>
                            <th>Security</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{JSON.stringify(this.state.description.securityDefinitions, null)}</td>
                            <td>{JSON.stringify(this.state.description.security, null)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table class="table table-striped " style={{ marginTop: 20 }}>
                    <thead class="table-primary">
                        <tr>
                            <th>Properties</th>
                            <th>Actions</th>
                            <th>Events</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.printProperties()}</td>
                            <td>{JSON.stringify(this.state.description.actions, null)}</td>
                            <td>{JSON.stringify(this.state.description.events, null)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
