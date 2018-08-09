import React, {Component} from 'react';

export default class Title extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Tu powstaje projekt Tilde</h1>
                    <p className="lead">Projekt końcowy na zaliczenia kurstu JavaScript React w szkole CodersLab ✌️</p>
                </div>
            </div>
        );
    }
}