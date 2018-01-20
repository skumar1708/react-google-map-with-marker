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
        zoom: 10,
        center: new google.maps.LatLng(19.469558,-99.1162114),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
   
    var infowindow = new google.maps.InfoWindow(),marker, i;
    let coords = [];
    (function loop(i,marker,self){
      let address = data.users[i].Address;
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address':address},function(results,status){
        if(results.length > 0){
          let latitude = results[0].geometry.location.lat();
          let longitude = results[0].geometry.location.lng();
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map
          });
          google.maps.event.addListener(marker, 'click', (function(marker, i, self) {
            return function() {
              self.state.favourites.push(data.users[i].Name);
              self.setState(self.state);
              infowindow.setContent(`<h1>${data.users[i].Name}</h1><br/><p>${data.users[i].Address}</p>`);
              infowindow.open(map, marker);
            }
          })(marker, i,self));
        }
        else{
          coords.push(data.users[i]);
        }
      });
      i++;
      if (i < data.users.length)
      {
          setTimeout(function() { loop(i,marker,self); }, 1000);
      }
    })(0,marker,this);
}
  onFavClick(){
    this.setState(
      {
        showFav: (this.state.showFav)?false:true
      }
    );
  }
  removeFav(val){
      let myFavs = this.state.favourites.filter(function(item, pos, self) {
        return item !== val;
      });
      this.setState({
        favourites: myFavs
      });
  }
  render() {
    let myFavs = this.state.favourites.filter(function(item, pos, self) {
                    return self.indexOf(item) == pos;
                });
    let that = this;
    return (
      <div className="instruct">
      <marquee>Click on Heart Icon Right to see List of Favourites Stores </marquee>
        <h1> Put your solution here!111<span className="fav-right">{myFavs.length >0  && myFavs.length}<i className="fa fa-heart" aria-hidden="true" onClick={this.onFavClick.bind(this)}></i> </span></h1>
        {this.state.showFav &&
            <div className="fav-list"> 
            <h3>My Favourite places</h3>        
            {
              myFavs.map(function(val,x){
                  return <div key={val+x}  className="fav-item-wrapper"><div className="remove-fav" onClick={that.removeFav.bind(that,val)} div-data={val}>X</div><p>{val}</p></div>
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