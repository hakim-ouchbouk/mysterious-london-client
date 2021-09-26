import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import {
  getAttractions,
  getAllAttractions,
  getAttractionCount,
} from "../../actions";

class AttractionsList extends React.Component {
  state = {
    buttonVisibilty: "",
  };

  componentDidMount() {
    this.props.getAttractions();
    this.props.getAttractionCount();
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

  renderGetAllButton = () => {
    if (
      !this.props.attractions ||
      this.props.count <= 3 ||
      this.props.attractions.length > 3
    )
      return "";
    return (
      <button
        style={{ visibility: this.state.buttonVisibilty }}
        onClick={() => {
          this.props.getAllAttractions();
          this.setState({ buttonVisibilty: "hidden" });
        }}
      >
        See All {this.props.count} Attractions
      </button>
    );
  };

  render() {
    return (
      <div>
        {this.renderAttractions()}
        <br />
        {this.renderGetAllButton()}
      </div>
    );
  }
}

export default connect(
  ({ attractions, attractionsCount }) => {
    return {
      attractions: _.values(attractions),
      count: attractionsCount.count,
    };
  },
  { getAttractions, getAllAttractions, getAttractionCount }
)(AttractionsList);
