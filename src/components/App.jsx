import React, {Component} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";


import ExampleComponent from './ExampleComponent';
import Title from './Title'

export default class App extends Component {
    render() {
        return (
            <div className='container-fluid text-center'>
                <Title/>
                <ExampleComponent/>
            </div>
        );
    }
}