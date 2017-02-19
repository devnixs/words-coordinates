import React, {PropTypes, PureComponent as Component} from 'react';
import styled from 'styled-components';

//https://coolors.co/335c67-fff3b0-e09f3e-9e2a2b-540b0e

const size = 40;

const Pin = styled.img`
	border-radius: 50%;
	width: ${size}px;
	height: ${size}px; 
    text-align:center;
    line-height: ${size}px;
    position:relative;
    left : -${Math.floor(size/2)}px;
    top : -${Math.floor(size)}px;
`;


export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    return (
          <Pin src={require('./pin.png')} alt="pin"/>
    );
  }
}