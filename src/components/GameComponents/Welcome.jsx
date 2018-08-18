import React, {Component,Fragment} from 'react';

import TildeAvatar from "./TildeAvatar";

export default class Welcome extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    <h1>To jest ekran powitalny.</h1>
                </div>
                <TildeAvatar/>
            </Fragment>

        );
    }
}