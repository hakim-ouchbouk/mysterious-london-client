import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { getAttractions, getAllAttractions } from "../../actions";

class AttractionsList extends React.Component {
  state = {
    buttonVisibilty: "",
  };

  componentDidMount() {
    this.props.getAttractions();
  }

  renderAttractions = () => {
    if (!this.props.attractions) return "";
    return (
      <ul>
        {this.props.attractions.map(({ name, _id }) => {
          return (
            <li key={_id}>{<Link to={`/attractions/${_id}`}>{name}</Link>}</li>
          );
        })}
      </ul>
    );
  };
  render() {
    return (
      <div>
        {this.renderAttractions()}
        <br />
        <button
          style={{ visibility: this.state.buttonVisibilty }}
          onClick={() => {
            this.props.getAllAttractions();
            this.setState({ buttonVisibilty: "hidden" });
          }}
        >
          Get All Attractions
        </button>
      </div>
    );
  }
}

export default connect(
  ({ attractions }) => {
    return { attractions: _.values(attractions) };
  },
  { getAttractions, getAllAttractions }
)(AttractionsList);
