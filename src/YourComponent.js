import React, { Component } from 'react';
import data from '../store_directory'
import PropTypes from 'prop-types';
import  './style.css';
/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class YourComponent extends Component {
  constructor(props){
    super(props);
    this.loadJS = this.loadJS.bind(this);
    this.state = {
      favourites:[],
      showFav:false
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
  onFavClick(){
    this.setState(
      {
        showFav: (this.state.showFav)?false:true
      }
    );
  }
  render() {
    let myFavs = this.state.favourites.filter(function(item, pos, self) {
                    return self.indexOf(item) == pos;
                });
    return (
      <div className="instruct">
        <h1> Put your solution here! <span className="fav-right"> Click Icon {myFavs.length >0  && myFavs.length}<i className="fa fa-heart" aria-hidden="true" onClick={this.onFavClick.bind(this)}></i> </span></h1>
        {this.state.showFav &&
            <div className="fav-list"> 
            <h3>My Favourite places</h3>        
            {
              myFavs.map(function(val,x){
                  return <p key={val+x}>{val}</p>
              })
            }
          </div>
        }
        <div id="map" className="map-style"></div>
      </div>
    );
  }
}
YourComponent.propTypes = {
  favourites:PropTypes.array
}