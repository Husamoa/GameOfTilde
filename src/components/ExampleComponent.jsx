import React, {Component} from 'react';

export default class ExampleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: '',
            alert: '',
            alertClass: ''
        };
    }

    onChangeName =(e) => {
        this.setState({
            name: e.target.value
        })
    };

    onSubmit = (e) => {
        if(!this.state.name.length) {
            this.setState({
                alert: 'Pole imię musi być wypełnione',
                alertClass: 'alert alert-danger'
            })
        } else {
            this.setState({
                visible: true
            });
        }

    };

    render() {
        const hello = this.state.visible ? <div className='m-4'><h1 className='h1'>Cześć {this.state.name}! Bedziesz grał w gre! </h1></div> : <div className={this.state.alertClass}>{this.state.alert}</div>;
        return (
            <div className='container'>
            <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Wpisz swoje imię</span>
                </div>
                <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.onChangeName}/>
                <div className="input-group-append">
                    <button onClick={() => this.onSubmit()} className="btn btn-outline-secondary" type="button">Potwierdź</button>
                </div>
            </div>
                {hello}
            </div>
        );
    }
}

