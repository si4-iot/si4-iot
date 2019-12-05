import React, {Component} from 'react';
import axios from 'axios';

export default class Edit extends Component {

    constructor(props) {
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            title: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/td/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id: this.state.id,
            title: this.state.title
        };
        axios.post('http://localhost:4000/td/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Alterar TD:</h3>
                <form onSubmit={this.onSubmit}>
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
                        <textarea type="text"
                                className="form-control"
                                value={this.state.body}
                                onChange={this.onChangeTitle}
                                />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Description" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}