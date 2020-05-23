import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

import {updateSession, loadOrCreateNewSession} from "./UserSession";
import {HintTooltip} from "./Tooltips";
import Typist from 'react-typist';
import { Player } from 'video-react';

export default class Levels extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            correct: false,
            alertClass: '',
            question: '',
            answer: '',
            hint1: '',
            hint2: '',
            hint3: '',
            userAnswer: '',
            button1DisabledClass: 'disabled',
            button2DisabledClass: 'disabled',
            button3DisabledClass: 'disabled'
        };
    }

    componentDidMount() {
        this.checkIfLevelAvailalbe(null);
    }

    componentDidUpdate(prevProps, prevState) {
        this.checkIfLevelAvailalbe(prevProps.match.params.id);
    }

    checkIfLevelAvailalbe = (prevId) => {
        return loadOrCreateNewSession().then(session => {
            console.log(session);
            const maxFinishedLevel = (Math.max.apply(Math, [...session.progress.finishedLevels, 0]));
            const available = [...session.progress.finishedLevels, maxFinishedLevel + 1].filter(Boolean);// we don't want zero

            if (available.indexOf(Number(this.props.match.params.id)) === -1) {
                return this.props.history.push('/not-found');
            }

            if (this.props.match.params.id !== prevId) {
                this.loadData();
            }

        });
    }


    loadData = () => {
        fetch(`https://gameoftilde.firebaseio.com/questions.json?orderBy="id"&equalTo=${this.props.match.params.id}`).then(resp => {
            return resp.json();
        }).then((data) => {
            data = Object.values(data)[0];
            const question = data.question;
            const answer = data.answer;
            this.setState({
                question: question,
                answer: answer,
                userAnswer: '',
                correct: ''
            });
            this.player.load();

        }).catch(err => {
            console.log('Błąd', err);
        });
    };

    onChangeAnswer = (e) => {
        this.setState({
            userAnswer: e.target.value.toLowerCase()
        });

        if (this.state.userAnswer.length <= 3) {
            this.setState({
                visible: false
            })
        }
    };


    goToNextLevel = () => {
        loadOrCreateNewSession().then(session => {
                session.progress.finishedLevels.push(parseInt(this.props.match.params.id, 10));
                session.progress.finishedLevels = session.progress.finishedLevels.filter(Boolean);
                session.progress.finishedLevels = session.progress.finishedLevels.filter((value, index, arr) => arr.indexOf(value) == index ).sort((a,b) => a - b);
                updateSession(session).then(() => {
                    let url = `/level/${Number(this.props.match.params.id) + 1}`;
                    this.props.history.push(url);
                })
        });
    };

    endOrNextLevel = () => {
        return fetch(`https://gameoftilde.firebaseio.com/questions.json`).then(resp => {
            return resp.json();
        }).then((data) => {
            console.log(data);
            if (Number(this.props.match.params.id) >= data.length) {
                return (
                    this.props.history.push('/end-of-game')
                )
            } else {
                this.goToNextLevel();
            }
        }).catch(err => {
            console.log('Błąd', err);
        });
    };

    onSubmit = () => {
        this.showHint();
        if (this.state.answer === this.state.userAnswer) {
            console.log('poprawna odpowiedź');
            this.setState({
                visible: false,
                correct: true,
                alertClass: 'alert alert-success'

            })
            this.endOrNextLevel();
        } else {
            this.setState({
                visible: true,
                correct: false,
                alertClass: 'alert alert-danger'
            })
            console.log('błędna odpowiedź');
        }
    };

    handleKeyPress = e => {
        if (e.charCode === 13) {
            this.onSubmit()
        }
    };

    showHint = () => {
        if (this.state.userAnswer && this.state.button1DisabledClass === 'disabled') {
            this.setState({
                button1DisabledClass: 'active'
            });

        } else if (this.state.userAnswer && this.state.button1DisabledClass === 'active' && this.state.button2DisabledClass === 'disabled') {
            this.setState({
                button2DisabledClass: 'active'
            })
        } else if (this.state.userAnswer && this.state.button1DisabledClass === 'active' && this.state.button2DisabledClass === 'active') {
            this.setState({
                button3DisabledClass: 'active'
            })
        }
    }

    render() {
        if (!this.state.question) {
            return (
                <div>
                <Typist>
                    ..............
                </Typist>
            </div>
            );
        }

        const wrong = this.state.visible ?
            <div className={this.state.alertClass} role='alert'>Błędna odpowiedź. Spróbuj jeszcze raz!</div> : null;

        const correct = this.state.correct ?
            <div className={this.state.alertClass} role='alert'>Super! Bardzo dobra odpowiedź</div> : null;

        return (
            <Fragment>
                <div className='container my-level-style'>
                    <div className='row'>
                        <div className='col-md-6'/>
                        <div className="col-md-4">
                            <div data-tip data-for="hintTooltip"
                                 className="btn-group d-flex flex-row justify-content-end" role="group"
                                 aria-label="Basic example">
                                <button data-tip data-for="hintTooltip1" type="button"
                                        className={`btn btn-primary ${this.state.button1DisabledClass}`}
                                        onClick={this.showHint}>1
                                </button>
                                <button data-tip data-for="hintTooltip2" type="button"
                                        className={`btn btn-primary ${this.state.button2DisabledClass}`}
                                        onClick={this.showHint}>2
                                </button>
                                <button data-tip data-for="hintTooltip3" type="button"
                                        className={`btn btn-primary ${this.state.button3DisabledClass}`}
                                        onClick={this.showHint}>3
                                </button>
                                <HintTooltip id='hintTooltip1' place='bottom' type='info'
                                             tooltipText='Wskazówka 1'/>
                                <HintTooltip id='hintTooltip2' place='bottom' type='info'
                                             tooltipText='Wskazówka 2'/>
                                <HintTooltip id='hintTooltip3' place='bottom' type='info'
                                             tooltipText='Wskazówka 3'/>
                            </div>
                        </div>
                        <div className='col-md-2 text-center'>
                            <Link to='/levels-progress'>
                                <button className='btn btn-info'> Powrót do mapy</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 d-fles justify-content-center">
                            <h2>Zagadka {this.props.match.params.id}</h2>
                            <div className="d-flex justify-content-center">
                              <Player
                                ref={player => {
                                  this.player = player;
                                }}
                                fluid={false}
                                aspectRatio="4:1"
                                >
                                <source src={this.state.question} />
                              </Player>
                            </div>
                            <div className='input-group mb-md-3'>
                                <input type="text" className="form-control" placeholder='Wpisz hasło'
                                       aria-label="answer" aria-describedby="basic-addon2"
                                       value={this.state.userAnswer}
                                       onChange={this.onChangeAnswer} onKeyPress={this.handleKeyPress}
                                       ref={input => input && input.focus()}/>
                                <div className="input-group-append">
                                    <button onClick={() => this.onSubmit()}
                                            className="btn btn-secondary"
                                            type="button">Sprawdź
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                {this.state.hint1}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                {wrong}
                            </div>
                            <div className="text-center">
                                {correct}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        );

    }
}
