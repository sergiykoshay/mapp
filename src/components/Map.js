
import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import WeatherCard from './WeatherCard';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";




const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null,
        reload: false
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => ({
            markerPosition: e.latLng,
            isMarkerShown:true,
            refresh: true,
            position : {
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            },
        })
      }),
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBz9UtX-wlLAqjxqocCUHAStUQhE2Uw2ZY&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `600px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={8} defaultCenter={ props.currentLocation } currentLocation={props.currentLatLng} onClick={props.onMapClick}>
        {props.isMarkerShown && <Marker position={ props.markerPosition } />}
        {props.isMarkerShown && <WeatherCard  position={{lat:props.position.lat,lon:props.position.lng}} refresh/>}
       
    </ GoogleMap>
    

  ))

export default Map;