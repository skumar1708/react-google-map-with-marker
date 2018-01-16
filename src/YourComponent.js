import React, { Component } from 'react';
import data from '../store_directory'
import PropTypes from 'prop-types';


/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class YourComponent extends Component {
  constructor(props){
    super(props);
    this.loadJS = this.loadJS.bind(this);
    this.state = {
      favourites:[]
    }
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap.bind(this);
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
    var map = new google.maps.Map( window.document.getElementById("map"),{
      zoom: 3,
      center: new google.maps.LatLng(39.414805,-94.1166931),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
   
    var infowindow = new google.maps.InfoWindow(),marker, i;

    for (i = 0; i < data.users.length; i++) { 
      if(data.users[i].Lat && data.users[i].Long){
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(data.users[i].Lat, data.users[i].Long),
          map: map
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i, self) {
          return function() {
            self.state.favourites.push(data.users[i].Name);
            self.setState(self.state);
            infowindow.setContent(`<h1>${data.users[i].Name}</h1><br/><p>${data.users[i].Address}</p>`);
            infowindow.open(map, marker);
          }
        })(marker, i,this));
      }
      
    }
}
  render() {
    return (
      <div style={divStyle}>
        <h1> Put your solution here!</h1>
        <div> 
          <h3>My Favourite places</h3>

          
          {
            this.state.favourites.filter(function(item, pos, self) {
                   return self.indexOf(item) == pos;
              }).map(function(val,x){
                return <p key={x}>{val}</p>
             })
          }
        </div>
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

YourComponent.propTypes = {
  favourites:PropTypes.array
}