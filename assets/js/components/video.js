import React, { Component } from 'react';
import video from 'twilio-video';




class Video extends Component {

    constructor() {
        super();
        this.state = {
            activeRoom: null,
            previewTracks: null,
            identity: null,
            roomName: '',
            roomNameError: false
        };

        this.attachTrack = this.attachTrack.bind(this);
        this.attachTracks = this.attachTracks.bind(this);
        this.displayCameraPreview = this.displayCameraPreview.bind(this);
    }

    componentDidMount() {
        this.log("This is very very good for now");
    }

    log(message) {
        let logSpan = document.getElementById('log');
        logSpan.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
        logSpan.scrollTop = logSpan.scrollHeight;
    }

    displayCameraPreview() {
        let globalContext = this;
        let localTracksPromise = this.state.previewTracks ? Promise.resolve(this.state.previewTracks) : video.createLocalVideoTrack();
        localTracksPromise.then(function(tracks) {
            window.previewTracks = globalContext.state.previewTracks = tracks;
            let previewContainer = document.getElementById('local-media');
            if (!previewContainer.querySelector('video')) {
                globalContext.attachTracks(tracks, previewContainer);
            }
        }, function(error) {
            console.error('Unable to access local media', error);
            globalContext.log("Unable to access Camera and Microphone");
        })
    }

    attachTracks(tracks, container) {
        console.log(tracks);
        let globalContext = this;
        tracks.forEach(function(track) {
            globalContext.attachTrack(track, container);
        })
    }

    attachTrack(track, container) {
        container.appendChild(track.attach());
    }

    render() {
        return(
            <div className="row-section">
                <div id={"remote-media"} />

                <div id={"controls"}>

                    <div id={"preview"}>
                        <p className={"instructions"}> Hello Developer </p>
                        <div id={"local-media"} />
                        <button onClick={this.displayCameraPreview} id={"button-preview"} > Preview Camera</button>
                    </div>

                    <div id={"room-controls"}>
                        <p className={"instructions"}>Room Name:</p>
                        <input id={"room-name"} type="text" placeholder="Enter a room name"/>
                        <button id={"button-join"}>Join Room</button>
                        <button id={"button-leave"}>Leave Room</button>
                    </div>

                    <div id={"log"} />

                </div>
            </div>
        )
    }
}

export default Video;