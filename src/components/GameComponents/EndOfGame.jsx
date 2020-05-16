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
                                <img className="avatar-sad" src="./images/pixel-pink-sad.png"/>
                                <img className="avatar-happy" src="./images/pixel-pink-happy.png"/>
                            </div>
                        </div>
                        <div className="col-sm-7 align-self-center">
                            <div className='avatar-say'>
                                <p> Dziękuję {this.state.name}! {this.help()} mi odzyskać cukierki. Moje dzieciństwo
                                    znów ma sens :-) </p>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <Link to='/levels-progress'>
                                <button className='btn btn-info'> Powrót do mapy</button>
                            </Link>
                        </div>
                    </div>
                    <div className='row my-row-end-game'>
                        <div className="col-md-12">
                            <div className='row'>
                                <div className="col-md-12-">
                                    <p className='text-center'>Podobało ci się? już teraz dołącz do nas, żeby poznać
                                        inne przygody tilde i zawsze na bieżąco móc jej pomóc.</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-3"/>
                                <div className="col-md-6">
                                    <div className="row align-items-center">
                                        <div className="col-4 align-items-center">
                                            <IconContext.Provider
                                                value={{
                                                    color: "darkblue",
                                                    className: "global-class-name",
                                                    size: "3em"
                                                }}>
                                                <div>
                                                    <a href='https://www.facebook.com/The-Coders-1714363951933261/' target='_blank'><FaFacebook/></a>
                                                </div>
                                            </IconContext.Provider>
                                        </div>
                                        <div className="col-4 justify-content-center">
                                            <IconContext.Provider
                                                value={{color: "blue", className: "global-class-name", size: "3em"}}>
                                                <div>
                                                    <a href='https://www.linkedin.com/in/pawel-bialek/' target='_blank'><FaTwitter/></a>
                                                </div>
                                            </IconContext.Provider>
                                        </div>
                                        <div className="col-4 justify-content-center">
                                            <IconContext.Provider
                                                value={{color: "red", className: "global-class-name", size: "3em"}}>
                                                <div>
                                                    <a href='https://www.instagram.com/' target='_blank'><FaInstagram/></a>
                                                </div>
                                            </IconContext.Provider>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3"/>
                            </div>
                            <div className='row'>
                                <div className="col-md-12">
                                    <p className='text-center'> Jeśli jesteś fajnym pracodawcą otwartym na niedoświadczonych acz zdolnych pracowników zobacz kod
                                        źródłowy na GitHub </p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-3"/>
                                <div className="col-md-6">
                                    <div className="row align-items-center">
                                        <div className="col-4 align-items-center"/>
                                        <div className="col-4 justify-content-center">
                                            <IconContext.Provider
                                                value={{color: "black", className: "global-class-name", size: "3em"}}>
                                                <div>
                                                    <a href="https://github.com/Husamoa/GameOfTilde" target='_blank'><FaGithub/></a>
                                                </div>
                                            </IconContext.Provider>
                                        </div>
                                        <div className="col-4 justify-content-center"/>

                                    </div>
                                </div>
                                <div className="col-md-6"/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}

