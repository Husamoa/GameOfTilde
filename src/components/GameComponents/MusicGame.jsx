import React, {Component, Fragment} from 'react';
import Sound from 'react-sound'


export default class Music extends Component {
        constructor(props) {
            super(props);
            this.state = {
                play: false,
                pause: true,
            };
            this.url = "http://www.jamesreams.com/wp-content/uploads/2013/01/Born-to-Roll-clip.mp3";
            this.audio = new Audio(this.url);
        }

        play = () => {
            this.setState({ play: true, pause: false });
            this.audio.play();
        };

        pause = () => {
            this.setState({ play: false, pause: true });
            this.audio.pause();
        };

        render() {

            return (
                <div>
                    <button onClick={this.play}>Play</button>
                    <button onClick={this.pause}>Pause</button>
                    <Sound
                        url={this.url}
                        playStatus={Sound.status.PLAYING}
                        playFromPosition={300 /* in milliseconds */}
                        onLoading={this.handleSongLoading}
                        onPlaying={this.handleSongPlaying}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                    />
                </div>

            );
        }
    }