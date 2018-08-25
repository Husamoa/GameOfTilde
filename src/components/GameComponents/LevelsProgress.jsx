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
        return [...this.state.progress, (Math.max.apply(Math, [...this.state.progress, 0]) || 0) + 1]
    }

    render() {

        console.log("@@@@@", this.state.progress, this.getAvailableLevels());

        return (
            <Fragment>
                <div className="appear container">
                    <div className="row h-100 p-5">
                        <div className="col-sm-3 align-self-end">
                            <div className='avatar'>
                                <img className="avatar-sad" src="./../../images/pixel-girl-sad.png" />
                                <img className="avatar-happy" src="./../../images/pixel-girl-happy.png" />
                            </div>
                        </div>
                        <div className="col-sm-6 justify-content-center">
                            <div className='avatar-say'>
                                <p>Cześć {this.state.name}, jestem Tilde. Tata schował mi wszystkie
                                    cukierki. Mój tata jest bardzo dowcipny i powiedział, że będę mogła je zjeść, jesli
                                    rozwiążę wszystkie zagadki, które przygotował. Ale ja jestem sprytna i znalazłam
                                    pomoc. Razem na pewno nam się uda. W drogę! </p>
                            </div>
                        </div>
                        <div className="col-sm-3 justify-content-center">
                            <div>
                                <p className='my-level-progress-style p-5 text-center'>{this.getAvailableLevels().map((levelNum) => {
                                    return <Link key={levelNum} to={`/level/${levelNum}`}> Zadanie {levelNum} </Link>
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>

        );
    }
}