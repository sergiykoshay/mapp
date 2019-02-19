import React from 'react';
import Map from './Map';
import WeatherCard from './WeatherCard';




class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentLatLng: {
          lat: 0,
          lng: 0
        },
        isMarkerShown: false,

      };
      this.onClickMap = this.onClickMap.bind(this);
    }


    coord = () => {
      console.log(navigator.geolocation);
    }


    showCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState(prevState => ({
              currentLatLng: {
                ...prevState.currentLatLng,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              isMarkerShown: true
            }))
          }
        );
      } else {
        console.log('Turn on you geolocation')
      }
    }

    onClickMap = () => {
      console.log("YO!!!!!==================>>>>>>>>>>>");
    }
  
  
    componentDidMount() {
      console.log("Container is mount");
      this.showCurrentLocation();
    }
  
    render() {
      return (
        <div>
          <Map
            isMarkerShown={this.state.isMarkerShown}
            currentLocation={this.state.currentLatLng}
            сenter={ this.props.currentLocation }
            onClick={this.onClickMap}
            >
            </Map>
        </div>
      );
    }
  }

  export default Container;

