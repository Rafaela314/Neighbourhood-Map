import React, { Component } from 'react';
import './App.css';

import {load_google_maps,load_places} from './utils';
import Sidebar from './components/Sidebar'

class App extends Component {

  constructor(props) {
    super (props);
    this.state = {
      query: '',
      mapError: false
    }
  }

  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let placesPromise = load_places();

    Promise.all([
      googleMapsPromise,
      placesPromise
    ])
    .then(values => {
      let google = values[0];
      this.venues = values[1].response.venues;

      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        scrollwheel: true,
        center: {lat: this.venues[0].location.lat, lng: this.venues[0].location.lng}
      })
      
      // Create a marker per location and put into markers array
      this.venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: {lat: venue.location.lat, lng: venue.location.lng},
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          location: venue.address,
          animation: google.maps.Animation.DROP

        });

        //console.log(venue);

        // Set animation to selected marker
        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) {marker.setAnimation(null); }
          else {marker.setAnimation(google.maps.Animation.BOUNCE); }
          setTimeout(() => {marker.setAnimation(null) }, 1500);
        });
        
        // Create an onclick event to open an infowindow at each marker 
        google.maps.event.addListener(marker, 'click', () => {
          this.infowindow.setContent(marker.name);
          //this.map.setZoom(12);
          this.map.setCenter(marker.position);
          this.infowindow.open (this.map, marker);
          this.map.panBy(0, -125);
        });
        //  Populate the markers array with generated markers
        this.markers.push(marker);
      });
        //  Re-render to update UI 
        this.setState({filteredVenues: this.venues});
  
    })

    //In case of eventual error on loading google maps, alert user
    window.gm_authFailure = () => {  this.setState({ mapError: true });  };

  }
  // Open info window on selected marker and animate It by click
  listItemclick = (venue) => { 
    let marker =  this.markers.filter(m => m.id === venue.id)[0];
    this.infowindow.setContent(marker.name);
    this.map.setCenter(marker.position);
    this.infowindow.open (this.map, marker);
    if (marker.getAnimation() !== null) {marker.setAnimation(null); }
    else {marker.setAnimation(this.google.maps.Animation.BOUNCE); }
    setTimeout(() => {marker.setAnimation(null) }, 1500);


  }
  // Filter venues by user input
  filterVenues = (query) => {
    let f = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase())); 
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
      marker.setVisible(true) : 
      marker.setVisible(false);

    });

    this.setState({filteredVenues : f, query});

  }

  render() {
    return (
      <main className="App" role="main">
        {this.state.mapError ? <p>Ooooops! An Error had ocurred. Sorry. Please try again or came back later ... </p> : <div  id="map" aria-label="The map of schools in São Paulo" role="application" ></div>}
        
        <Sidebar 
            filterVenues={this.filterVenues} 
            filteredVenues={this.state.filteredVenues} 
            listItemclick={this.listItemclick}/>  
         

      </main>

    );
  }
}

export default App;
