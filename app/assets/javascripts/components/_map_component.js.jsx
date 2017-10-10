var MapComponent = React.createClass({
  componentDidMount() {
    var mapContainer = document.getElementById('map-container');
    var geocoder = new google.maps.Geocoder();
    var mapDefaultOptions;
    var markerImage = 'https://res.cloudinary.com/djnzkhyxr/image/upload/v1498079839/pointer_iw70le.png';

    var mapDefaultOptions = {
      zoom: 15,
      center: {
        lat: 48.463819,
        lng: 35.053189
      },
      streetViewControl: false,
      mapTypeControl: false
    };
    var map = new google.maps.Map(mapContainer, mapDefaultOptions);
  },

  render() {
    return (
      <div className="container" id="map-container"></div>
    );
  }
});
