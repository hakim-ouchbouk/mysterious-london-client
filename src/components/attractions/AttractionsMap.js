import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import _ from "lodash";
import { getAllAttractions } from "../../actions";
import { Link } from "react-router-dom";
import { MainContainer } from "../styledComponents/general";

const Marker = ({ id }) => (
  <div>
    <Link to={`/attractions/${id}`}>
      <img alt="marker" src="/marker.png" height="20px" width="20px" />
    </Link>
  </div>
);

class AttractionsMap extends Component {
  componentDidMount() {
    this.props.getAllAttractions();
  }

  renderMarkers = () => {
    return this.props.attractions.map(({ geocode, _id }) => {
      return <Marker id={_id} key={_id} lat={geocode.lat} lng={geocode.lng} />;
    });
  };

  render() {
    return (
      <MainContainer>
        <div style={{ height: "90vh", width: "100%", marginTop: "20px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={{ lat: 51.50809, lng: -0.129137 }}
            defaultZoom={11}
          >
            {this.renderMarkers()}
          </GoogleMapReact>
        </div>
      </MainContainer>
    );
  }
}

export default connect(
  ({ attractions }) => {
    return { attractions: _.values(attractions) };
  },
  { getAllAttractions }
)(AttractionsMap);
