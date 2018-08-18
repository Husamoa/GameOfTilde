import React, {Component, Fragment} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import Welcome from './GameComponents/Welcome';
import LevelsProgress from './GameComponents/LevelsProgress';
import EndOfGame from './GameComponents/EndOfGame';
import Level from './LevelsComponents/Levels'

export default class Game extends Component {
    render() {
        return (
            <Fragment>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={Welcome}/>
                        <Route path='/levels-progress' component={LevelsProgress}/>
                        <Route path='/level/:id' component={Level}/>
                        <Route path='/end-of-game' component={EndOfGame}/>
                    </Switch>
                </HashRouter>
            </Fragment>
        );
    }
}

