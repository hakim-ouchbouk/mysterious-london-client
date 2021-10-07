import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import _ from "lodash";
import { getAllAttractions } from "../../actions";
import { Link } from "react-router-dom";
import { MainContainer } from "../styledComponents/general";
import {
  AttractionCard,
  AttractionImg,
  CardContent,
} from "../styledComponents/attractionsList";

const Marker = ({ attraction }) => {
  const [isShown, setIsShown] = useState(false);
  const [zIndex, setZIndex] = useState(0);
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -40%) scale(0.8)",
        zIndex,
      }}
      onMouseOver={() => {
        setIsShown(true);
        setZIndex(10);
      }}
      onMouseLeave={() => {
        setIsShown(false);
        setZIndex(0);
      }}
    >
      {isShown && (
        <AttractionCard key={attraction._id}>
          <Link className="link" to={`/attractions/${attraction._id}`}>
            <AttractionImg src={attraction.images[0].url} alt="pic" />
            <CardContent>
              {<p className="name">{attraction.name}</p>}
              <p className="subtitle">
                {attraction.description.substring(0, 101)}...
              </p>
            </CardContent>
          </Link>
        </AttractionCard>
      )}
      {!isShown && (
        <img alt="marker" src="/marker.png" height="30px" width="30px" />
      )}
    </div>
  );
};
class AttractionsMap extends Component {
  componentDidMount() {
    this.props.getAllAttractions();
  }

  renderMarkers = () => {
    return this.props.attractions.map((attraction) => {
      let { geocode, _id } = attraction;
      return (
        <Marker
          key={_id}
          lat={geocode.lat}
          lng={geocode.lng}
          attraction={attraction}
        />
      );
    });
  };

  render() {
    return (
      <MainContainer>
        <div
          style={{
            height: "90vh",
            width: "100%",
            marginTop: "20px",
            position: "relative",
          }}
        >
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
