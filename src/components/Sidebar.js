import React, { Component } from 'react';

class Sidebar extends Component {




  render() {
    return (
      <aside id="sidebar">
        <h3>Find a school in</h3>
        <h1>São Paulo </h1>
        <p>Powered by <a href="https://cloud.google.com/maps-platform/?hl=pt-BR">Google Maps</a> & <a href="https://developer.foursquare.com/">Foursquare</a>
        </p>
        <br/>

        <input className="filter" placeholder="Search" value={this.props.query} onChange={(e) => {this.props.filterVenues(e.target.value) }}/>
        <br/>
        <br/>
        {
          this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue, index) => (
            <div key={index} className="venue-item" onClick={()=> {this.props.listItemclick(venue)}} >
              {venue.name}
            </div>
          ))
        }
      </aside>

    );
  }
}

export default Sidebar;
