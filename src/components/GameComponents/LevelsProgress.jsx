import React, {Component,Fragment} from 'react';
import {Link} from "react-router-dom";


export default class LevelsProgress extends Component {
    render() {
        return (
            <Fragment>
                <h1>To jest ekran planszy głównej.</h1>
                <Link to='/level/1'> Zadanie 1 </Link>
            </Fragment>

        );
    }
}