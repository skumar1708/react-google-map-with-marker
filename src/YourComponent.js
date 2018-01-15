import React, { Component } from 'react';

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class YourComponent extends Component {
  constructor(props){
    super(props);
    this.loadJS = this.loadJS.bind(this);
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A&callback=initMap')
}

  loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

initMap() {
    let map = new google.maps.Map( window.document.getElementById("map"),{
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

   let marker = new google.maps.Marker({
      position: new google.maps.LatLng(-33.92, 151.25),
      map: map
    });
    let infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click',function() {
      infowindow.setContent("Sydney Temps");
      infowindow.open(map, marker);
    })
}
  render() {
    return (
      <div style={divStyle}>
        <h1> Put your solution here!</h1>
        <div id="map" style={mapStyle}></div>
      </div>
    );
  }
}

var divStyle = {
  border: 'red',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 20
};
var mapStyle  = {
  height: '500px',
  width: '100%'
}