import React, { PropTypes } from 'react';
import Map, {Marker, InfoWindow} from 'google-maps-react'
import _ from 'lodash';
import {GoogleApiWrapper} from 'google-maps-react'

@GoogleApiWrapper({
  apiKey: 'AIzaSyCXhXG7y6w4Fz3AgM0BhCyNo2RhhHDSCaE'
})
class HomePage extends React.Component {

  static propTypes = {
  };

  render() {
    return (
      <div>
        <h1>Find any location, with three words.</h1>
        <Map google={this.props.google} zoom={14}>
          <Marker onClick={this.onMarkerClick} name={'Current location'} />

          <InfoWindow visible onClose={this.onInfoWindowClose}>
              <div>
                <h1>test</h1>
              </div>
          </InfoWindow>
        </Map>

      </div>
    );
  }

}



export default HomePage;
