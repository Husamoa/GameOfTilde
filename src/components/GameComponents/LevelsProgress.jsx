import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {loadOrCreateNewSession} from "./UserSession";


export default class LevelsProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            progress: []
        }
    }

    componentDidMount() {
        loadOrCreateNewSession().then(session => {
            this.setState({
                name: session.name,
                progress: session.progress.finishedLevels
            });
        });
    }

    getAvailableLevels = () => {
        const maxFinishedLevel = (Math.max.apply(Math, [...this.state.progress, 0]));
        return [...this.state.progress, maxFinishedLevel + 1].filter(Boolean); // we don't want zero
    };

    render() {

        console.log("@@@@@", this.state.progress, this.getAvailableLevels());

        return (
            <Fragment>
                <div className="appear container">
                    <div className="row">
                        <div className="col-sm-3 align-self-center">
                            <div className='avatar'>
                                <img className="avatar-sad" src="./images/pixel-pink-sad.png"/>
                                <img className="avatar-happy" src="./images/pixel-pink-happy.png"/>
                            </div>
                        </div>
                        <div className="col-sm-6 justify-content-center">
                            <div className='avatar-say'>
                                <p>Cześć {this.state.name},</p>
                                <p>jestem Tilde i potrzebuję Twojej pomocy!!!</p>
                                <p>Tata schował mi wszystkie cukierki i powiedział, że dostanę je z powrotem, jeśli
                                    rozwiążę zagadki, które mi przygotował. to co? pomożesz?</p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className='my-level-progress-style justify-content-center'>
                                <p className='align-self-center text-center'>{this.getAvailableLevels().map((levelNum) => {
                                    return <Link key={levelNum} to={`/level/${levelNum}`}> Zagadka {levelNum} </Link>
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}