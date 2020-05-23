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
                                <p>Instrukcja:</p>
                                <p>Twoim zadaniem jest przejście gry. Na każdym etapie będzie filmik z zagadką/zadaniem, który nagrali Twoi znajomi. Po rozwiązaniu zagadki, musisz zadzwonić do danej osoby i powiedzieć jej rozwiązanie, a w zamian dostaniesz hasło do wpisania pod filmikiem (będzie to przymiotnik opisujący Ciebie wg danej osoby). Nie musisz się spieszyć, masz na to cały dzień a na końcu gry czeka Cię prezent :-) Powodzenia!!!</p>
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
