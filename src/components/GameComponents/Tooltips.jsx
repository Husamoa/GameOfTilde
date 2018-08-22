import React, {Component, Fragment} from 'react';
import ReactTooltip from 'react-tooltip';


export default class MusicTooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {

        return (
            <ReactTooltip id={this.props.id} type={this.props.type} place={this.props.place}>
                <span>{this.props.tooltipText}</span>
            </ReactTooltip>
        );
    }

};



