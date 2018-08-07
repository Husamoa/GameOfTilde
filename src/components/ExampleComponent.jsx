import React, {Component} from 'react';

export default class ExampleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Webpack działa...'
        };
    }

    componentDidMount() {
        this.timeoutId = setTimeout(() => {
            this.setState({
                text: '...jak ta lala'
            })
        }, 5000)
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }


    render() {
        return (
            <div>
                <h1> {this.state.text} </h1>
            </div>
        );
    }
}

