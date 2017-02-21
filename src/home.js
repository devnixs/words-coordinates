import React, { PropTypes } from 'react';
import _ from 'lodash';
import GoogleMap from 'google-map-react';
import Marker from './marker.js';
import styled from 'styled-components';
import {getThreeWordsFromLatLng, getLatLngFromThreeWords, doWordsExist} from './converter.js';

//https://coolors.co/335c67-fff3b0-e09f3e-9e2a2b-540b0e

const MapContainer = styled.div`
  width:100%;
  height: calc(100% - 126px);
  clear:both;
  position:relative;
`;

const CurrentLocation = styled.span`
  display:inline-block;
  color: #FFF3B0;
  background : #9e2a2b;
  float:right;
  margin-right:10px
  padding:5px;
`;

const KnowTheWords = styled.div`
  position:absolute;
  left:0;
  top:0;
  width:290px;
  height:120px;
  z-index:200;
  background: #FFF3B0;
  padding-left:10px;
  padding-right:10px;
`

const CustomInput = styled.input`
    display: block;
    width: 260px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
`;

const GithubIcon = styled.a`
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
    top: -6px;
`;

const KnowTheWordsTitle = styled.h4`
  margin:12px;
`


const ByRaphael = styled.div`
  position:absolute;
  left:0;
  bottom:0;
  width:160px;
  height:20px;
  z-index:200;
  background: #FFF3B0;
  padding-left:10px;
  padding-right:10px;
  border:1px solid #E09F3E;
  text-align:center;
  `

class HomePage extends React.Component {

  static propTypes = {
  };

  constructor(props){
    super(props);

    const initialPosition = {
          lat: 43.255503,
          lng: 5.565581
      };

    const words = getThreeWordsFromLatLng(initialPosition.lat,initialPosition.lng);

    this.state = {
      markerPosition: initialPosition ,
      center: initialPosition,
      initialCenter : initialPosition,
      words : words,
      typedWords: words.join(' '),
    }

    this.loadUserLocation();

    this.onClick=this.onClick.bind(this);
    this.onWordsTyped=this.onWordsTyped.bind(this);
    this.onCenterChanges=this.onCenterChanges.bind(this);
  }

  loadUserLocation(){
    if(navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition){
      navigator.geolocation.getCurrentPosition((location) => {
          const pos= {lat : location.coords.latitude, lng : location.coords.longitude};
          const words = getThreeWordsFromLatLng(pos.lat,pos.lng);
          this.setState({
            markerPosition: pos,
            center: pos,
            words : words,
            typedWords: words.join(' '),
          })
      });
    }
  }

  onClick({ x, y, lat, lng, event }){
    this.setState({
      markerPosition : {
        lat,
        lng
      },
      words : getThreeWordsFromLatLng(lat,lng)
    })
  }

  onWordsTyped(event){
    const typedWords = event.target.value.toLowerCase();

    const update ={
      typedWords,
    }

    const splittedWords = typedWords.trim().split(' ');
    if(splittedWords.length === 3){
      if(doWordsExist(splittedWords)){
        const {lat,lng} = getLatLngFromThreeWords(splittedWords);
        update.markerPosition = {lat,lng};
        update.words = splittedWords;

        update.center = {lat,lng};
      }
    }

    this.setState(update);
  }

  onCenterChanges(event){
    this.setState({
      center:event.center,
    })
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <h1>
          <GithubIcon href="https://github.com/devnixs/words-coordinates" title="Fork me on GitHub"><img src={require('./GitHub-Mark-64px.png')} alt="Github icon"/></GithubIcon>
          Find any location, with three words. 
          <CurrentLocation>{this.state.words.join(' ')}</CurrentLocation>
        </h1>
        <MapContainer>
          <KnowTheWords>
            <KnowTheWordsTitle>I know the words</KnowTheWordsTitle>
            <CustomInput value={this.state.typedWords} onChange={this.onWordsTyped} />
          </KnowTheWords>
          {/*<ByRaphael>By <a href="https://github.com/devnixs">Raphael ATALLAH</a></ByRaphael>*/}
          <GoogleMap
            onClick={this.onClick}
            apiKey={'AIzaSyCXhXG7y6w4Fz3AgM0BhCyNo2RhhHDSCaE'}
            center={this.state.center}
            defaultCenter={this.state.initialCenter}
            onChange={this.onCenterChanges}
            zoom={16}>
              <Marker lat={this.state.markerPosition.lat} lng={this.state.markerPosition.lng} text={'A'} />
          </GoogleMap>
        </MapContainer>
      </div>
    );
  }

}



export default HomePage;
