import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {loadOrCreateNewSession} from "./UserSession";


export default class LevelsProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: []
        }
    }

    componentDidMount() {
        loadOrCreateNewSession().then(session => {
            this.setState({
                progress: session.progress.finishedLevels
            });
        });
    }

    getAvailableLEvels = () => {
        return [ ...this.state.progress, (Math.max.apply( Math, [ ...this.state.progress, 0 ] ) || 0) + 1]
    }

    render() {

        console.log("@@@@@", this.state.progress, this.getAvailableLEvels());

        return (
            <Fragment>
                <h1>To jest ekran planszy głównej.</h1>
                { this.getAvailableLEvels().map((levelNum) => {
                    return <Link key={levelNum} to={ `/level/${levelNum}` }> Zadanie {levelNum} </Link>
                })}
            </Fragment>

        );
    }
}