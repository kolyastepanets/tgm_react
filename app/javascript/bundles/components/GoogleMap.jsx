import React from 'react';

export default class GoogleMap extends React.Component {
  componentDidMount() {
    let mapContainer = document.getElementById('map-container');
    let geocoder = new google.maps.Geocoder();
    let markerImage = 'https://res.cloudinary.com/djnzkhyxr/image/upload/v1498079839/pointer_iw70le.png';

    let mapDefaultOptions = {
      zoom: 15,
      center: {
        lat: 48.463819,
        lng: 35.053189
      },
      streetViewControl: false,
      mapTypeControl: false
    };
    let map = new google.maps.Map(mapContainer, mapDefaultOptions);
  }

  render() {
    return (
      <div id="map-container"></div>
    );
  }
}
