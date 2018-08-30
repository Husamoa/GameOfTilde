import React, {Component, Fragment} from 'react';
import {loadOrCreateNewSession} from "./UserSession";
import {IconContext} from "react-icons";
import {FaFacebook} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'

import {Link} from "react-router-dom";

export default class EndOfGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    componentDidMount() {
        loadOrCreateNewSession().then(session => {
            this.setState({
                name: session.name
            })
        })
    }

    help = () => {
        return this.state.name[this.state.name.length - 1] === 'a' ? 'pomogłaś' : 'pomogłeś'
    };

    render() {
        return (
            <Fragment>
                <div className="appear container">
                    <div className="row my-row-end-game justify-content-center">
                        <div className="col-sm-3 align-self-center">
                            <div className='avatar'>
                                <img className="avatar-sad" src="./../../images/pixel-pink-sad.png"/>
                                <img className="avatar-happy" src="./../../images/pixel-pink-happy.png"/>
                            </div>
                        </div>
                        <div className="col-sm-6 align-self-center">
                            <div className='avatar-say'>
                                <p> Dziękuję {this.state.name}! {this.help()} mi dotrzeć do cukierków. Zjedzmy je razem!
                                    Smacznego! </p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className='justify-content-center'>
                                <Link to='/levels-progress'>
                                    <button className='btn btn-info'> Powrót do mapy</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-12-">
                            <p className='text-center'>Jeśli podobała Ci się zabawa dołącz do nas aby zobaczyć inne gry
                                i być na bieżąco kiedy powstaną kolejne.</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-6">
                            <div className="row align-items-center">
                                <div className="col-4 align-items-center">
                                    <IconContext.Provider
                                        value={{color: "darkblue", className: "global-class-name", size: "3em"}}>
                                        <div>
                                            <FaFacebook/>
                                        </div>
                                    </IconContext.Provider>
                                </div>
                                <div className="col-4 justify-content-center">
                                    <IconContext.Provider
                                        value={{color: "blue", className: "global-class-name", size: "3em"}}>
                                        <div>
                                            <FaTwitter/>
                                        </div>
                                    </IconContext.Provider>
                                </div>
                                <div className="col-4 justify-content-center">
                                    <IconContext.Provider
                                        value={{color: "red", className: "global-class-name", size: "3em"}}>
                                        <div>
                                            <FaInstagram/>
                                        </div>
                                    </IconContext.Provider>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-12">
                            <p className='text-center'> Jeśli jesteś dobrym i fajnym pracodawcą zobacz kod źródłowy na GitHub </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-6">
                            <div className="row align-items-center">
                                <div className="col-4 align-items-center">

                                </div>
                                <div className="col-4 justify-content-center">
                                    <IconContext.Provider
                                        value={{color: "black", className: "global-class-name", size: "3em"}}>
                                        <div>
                                            <FaGithub/>
                                        </div>
                                    </IconContext.Provider>
                                </div>
                                <div className="col-4 justify-content-center">

                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>

                </div>
            </Fragment>

        );
    }
}

