import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

import {updateSession, loadOrCreateNewSession} from "./UserSession";
import EndOfGame from "./EndOfGame";


export default class Levels extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            this.endOrNextLevel();
        } else {
            console.log('błędna odpowiedź');
        }
    };

    handleKeyPress = e => {
        if (e.charCode === 13) {
            this.onSubmit()
        }
    };


    render() {
        return (
            <Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className='col-10'>
                            <h1></h1>
                        </div>
                        <div className='col-2'>
                            <Link to='/levels-progress'>
                                <button className='btn btn-info'> Powrót do mapy</button>
                            </Link>
                        </div>
                    </div>

                    <h2>Zagadka {this.props.match.params.id}.</h2>
                    <div>
                        {this.state.question}
                    </div>
                    <input type="text" className="form-control" aria-label="Large"
                           aria-describedby="inputGroup-sizing-sm" value={this.state.userAnswer}
                           onChange={this.onChangeAnswer} onKeyPress={this.handleKeyPress}
                           ref={input => input && input.focus()}/>
                    <div className="input-group-append">
                        <button onClick={() => this.onSubmit()}
                                className="btn btn-outline-secondary"
                                type="button">Sprawdź
                        </button>
                    </div>
                </div>
            </Fragment>

        );

    }
}

