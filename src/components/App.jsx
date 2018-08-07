import React, {Component} from 'react';

import ExampleComponent from './ExampleComponent';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ExampleComponent/>
        );
    }
}