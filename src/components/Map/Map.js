import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './style.css'

class Map extends Component {
   render() {
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {{ lat: 25.4333, lng: -101 }}
        defaultZoom = { 13 }
      >
      </GoogleMap>
   ));
   return(
      <div className="row justify-content-center">
        <GoogleMapExample className="col-sm-12"
          containerElement={ <div style={{ height: '300px', width: '300px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};
export default Map;