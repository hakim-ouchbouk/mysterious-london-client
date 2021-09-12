import React from "react";

class Map extends React.Component {
  render() {
    if (this.props.geocode.lat === 0) return "LOCATION NOT FOUND";
    return (
      <iframe
        title="map"
        width="400"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=
        ${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        &q=${this.props.location}
        &center=${this.props.geocode.lat},${this.props.geocode.lng}`}
      ></iframe>
    );
  }
}

export default Map;
