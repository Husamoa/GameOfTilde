import React, {Component, Fragment} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import Welcome from './GameComponents/Welcome';
import LevelsProgress from './GameComponents/LevelsProgress';
import EndOfGame from './GameComponents/EndOfGame';
import Level from './GameComponents/Levels';
import NotFound from './GameComponents/NotFound'
import MusicGame from './GameComponents/MusicGame'


export default class Game extends Component {
    render() {
        return (
            <Fragment>
                <div className='game-style'>
                    <MusicGame/>
                        <HashRouter>
                            <Switch>
                                <Route exact path='/' component={Welcome}/>
                                <Route path='/levels-progress' component={LevelsProgress}/>
                                <Route path='/level/:id' component={Level}/>
                                <Route path='/end-of-game' component={EndOfGame}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </HashRouter>
                </div>
            </Fragment>
        );
    }
}

