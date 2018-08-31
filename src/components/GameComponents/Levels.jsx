import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

import {updateSession, loadOrCreateNewSession} from "./UserSession";
import EndOfGame from "./EndOfGame";


export default class Levels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            alertClass: '',
            question: '',
            answer: '',
            userAnswer: ''
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadData();
        }
    }

    loadData = () => {
        fetch(`/questions/${this.props.match.params.id}`).then(resp => {
            return resp.json();
        }).then((data) => {
            const question = data.question;
            const answer = data.answer;
            this.setState({
                question: question,
                answer: answer,
                userAnswer: ''
            });
        }).catch(err => {
            console.log('Błąd', err);
        });
    };

    onChangeAnswer = (e) => {

        this.setState({
            userAnswer: e.target.value
        })

        if (this.state.userAnswer.length <= 3) {
            this.setState({
                visible: false
            })
        }
    };


    goToNextLevel = () => {
        loadOrCreateNewSession().then(session => {
            if (session.progress.finishedLevels.includes(Number(this.props.match.params.id))) {
                let url = `/level/${Number(this.props.match.params.id) + 1}`;
                this.props.history.push(url);
            } else {
                session.progress.finishedLevels.push(parseInt(this.props.match.params.id, 10));
                session.progress.finishedLevels = session.progress.finishedLevels.filter(Boolean);
                updateSession(session).then(() => {
                    let url = `/level/${Number(this.props.match.params.id) + 1}`;
                    this.props.history.push(url);
                })
            }
        });
    };

    endOrNextLevel = () => {
        return fetch(`/questions`).then(resp => {
            return resp.json();
        }).then((data) => {
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
        if (this.state.answer === this.state.userAnswer) {
            console.log('poprawna odpowiedź');
            this.setState({
                visible: false
            })
            this.endOrNextLevel();
        } else {
            this.setState({
                visible: true,
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


    render() {
        const wrong = this.state.visible ?
            <div className={this.state.alertClass} role='alert'>Błędna odpowiedź. Spróbuj jeszcze raz!</div> : null;
        return (
            <Fragment>
                <div className='container my-level-style'>
                    <div className='row'>
                        <div className='col-md-10'/>
                        <div className='col-md-2'>
                            <Link to='/levels-progress'>
                                <button className='btn btn-info'> Powrót do mapy</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Zagadka {this.props.match.params.id}.</h2>
                            <div>
                                {this.state.question}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className='input-group mb-md-3'>
                                <input type="text" className="form-control" placeholder='Wpisz odpowiedź'
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
                                {wrong}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        );

    }
}

