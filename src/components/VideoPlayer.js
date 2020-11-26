//importing dependencies
import React from "react";
import shaka from "shaka-player";
import muxjs from "mux.js";

//Creating class component

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    //Load mux.js
    window.muxjs = muxjs;

    //Creating reference which will allow access to video player on DOM
    this.videoComponent = React.createRef();

    //Adding reference to event handler functions
    this.onErrorEvent = this.onErrorEvent.bind(this);
    this.onError = this.onError.bind(this);
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  }

  //Initialize your shaka player here
  componentDidMount(props) {
    //MPEG-DASH video URL
    var manifestUri =
      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

    //Reference to our video component on DOM
    const video = this.videoComponent.current;

    //Request full screen (this works for dekstop browsers only)
    video.requestFullscreen();

    //Initializing our shaka player
    var player = new shaka.Player(video);

    // Listen for error events.
    player.addEventListener("error", this.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(manifestUri)
      .then(function () {
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  render() {
    //Returning video component. Shaka player will be added to this component once its mounted on DOM

    return (
      <video
        autoPlay
        width="640"
        ref={this.videoComponent}
        poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
        controls
      />
    );
  }
}

export default VideoPlayer;