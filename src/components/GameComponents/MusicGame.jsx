import React, {Component, Fragment} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVolumeOff, faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import MusicTooltip from "./Tooltips";

library.add(faVolumeOff, faVolumeUp);

export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            pause: false,
            buttonIcon: 'volume-up',
            tooltipText: ''
        };
        this.url = "http://pawelbialek.pl/lollypop.mp3";
        this.audio = new Audio(this.url);
    }

    componentDidMount() {
        this.play();
    }


    pausePlay = () => {
        this.state.play ? this.pause() : this.play();
    };

    play = () => {
        this.setState({play: true, pause: false, buttonIcon: 'volume-up', tooltipText: 'wycisz muzykę'});
        this.audio.play();
    };

    pause = () => {
        this.setState({play: false, pause: true, buttonIcon: 'volume-off',                 tooltipText: 'włącz muzykę'});
        this.audio.pause();
    };

    render() {
        return (
            <Fragment>
                <div data-tip data-for="musicTooltip" className='text-right'>
                    <button className='my-btn-awesome' onClick={this.pausePlay}>
                        <FontAwesomeIcon icon={this.state.buttonIcon}/>
                    </button>
                    <MusicTooltip id='musicTooltip' place='left' type='info' tooltipText={this.state.tooltipText}/>
                </div>
            </Fragment>

        );
    }
}