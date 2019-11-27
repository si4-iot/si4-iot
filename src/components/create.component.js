import React, {Component} from 'react';
import axios from 'axios';

export default class CreateDesc extends Component {

    constructor(props) {
        super(props);

        this.onChangeContext = this.onChangeContext.bind(this);
        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSecurityDef = this.onChangeSecurityDef.bind(this);
        this.onChangeSecurity = this.onChangeSecurity.bind(this);
        this.onChangeProperties = this.onChangeProperties.bind(this);
        this.onChangeActions = this.onChangeActions.bind(this);
        this.onChangeEvents = this.onChangeEvents.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            context: '',
            id: '',
            title: '',
            securityDef: '',
            security: '',
            properties: '',
            actions: '',
            events: ''
        }
    }

    onChangeContext(e) {
        this.setState({
            context: e.target.value
        });
    }
    
    onChangeID(e) {
        this.setState({
            id: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeSecurityDef(e) {
        this.setState({
            securityDef: e.target.value
        });
    }

    onChangeSecurity(e) {
        this.setState({
            security: e.target.value
        });
    }

    onChangeProperties(e) {
        this.setState({
            properties: e.target.value
        });
    }

    onChangeActions(e) {
        this.setState({
            actions: e.target.value
        });
    }

    onChangeEvents(e) {
        this.setState({
            events: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        
        const newTD = {
            context: this.state.context,
            id: this.state.id,
            title: this.state.title,
            securityDef: this.state.securityDef,
            security: this.state.security,
            properties: this.state.properties,
            actions: this.state.actions,
            events: this.state.events
        }

        console.log(newTD)
        axios.post('http://localhost:4000/td/add', newTD)
            .then(res => console.log(res.data));

        this.setState({
            context: '',
            id: '',
            title: '',
            securityDef: '',
            security: '',
            properties: '',
            actions: '',
            events: ''
        });
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Adicionar TD</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Context: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.context}
                                onChange={this.onChangeContext}
                                />
                    </div>
                    <div className="form-group">
                        <label>ID: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.id}
                                onChange={this.onChangeID}
                                />
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Security Definitions: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.securityDef}
                                onChange={this.onChangeSecurityDef}
                                />
                    </div>
                    <div className="form-group">
                        <label>Security: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.security}
                                onChange={this.onChangeSecurity}
                                />
                    </div>
                    <div className="form-group">
                        <label>Properties: </label>
                        <textarea  type="text"
                                className="form-control"
                                value={this.state.properties}
                                onChange={this.onChangeProperties}
                                />
                    </div>
                    <div className="form-group">
                        <label>Actions: </label>
                        <textarea  type="text"
                                className="form-control"
                                value={this.state.actions}
                                onChange={this.onChangeActions}
                                />
                    </div>
                    <div className="form-group">
                        <label>Events: </label>
                        <textarea type="text"
                                className="form-control"
                                value={this.state.events}
                                onChange={this.onChangeEvents}
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