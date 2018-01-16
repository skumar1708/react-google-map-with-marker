import React, { Component } from 'react';
import data from '../store_directory'
import { setTimeout } from 'timers';

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
    console.log('Users is', data.users.length);
}

  loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

initMap() {
    var map = new google.maps.Map( window.document.getElementById("map"),{
      zoom: 3,
      center: new google.maps.LatLng(39.414805,-94.1166931),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  //  let marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(43.191797,-89.453478),
  //     map: map
  //   });
    var infowindow = new google.maps.InfoWindow();
    // google.maps.event.addListener(marker, 'click',function() {
    //   infowindow.setContent("<h1>Mexico Temps</h1><br/>State");
    //   infowindow.open(map, marker);
    // })

    var marker, i;

    for (i = 0; i < data.users.length; i++) { 
      if(data.users[i].Lat && data.users[i].Long){
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(data.users[i].Lat, data.users[i].Long),
          map: map
        });
  
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(`<h1>${data.users[i].Name}</h1><br/><p>${data.users[i].Address}</p>`);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
      
    }
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