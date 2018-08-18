import React, {Component, Fragment} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import Welcome from './GameComponents/Welcome';
import MainBoard from './GameComponents/MainBoard';
import EndOfGame from './GameComponents/EndOfGame';
import Levels from './LevelsComponents/Levels'

export default class Game extends Component {
    render() {
        return (
            <Fragment>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={Welcome}/>
                        <Route path='/main-board' component={MainBoard}/>
                        <Route path='/level/:1' component={Levels}/>
                        <Route path='/end-of-game' component={EndOfGame}/>
                    </Switch>
                </HashRouter>
            </Fragment>
        );
    }
}