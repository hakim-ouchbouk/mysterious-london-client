import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { searchAttractions } from "../../actions";


class Search extends React.Component {
  state = {
    query: "",
  };

  onQueryChange = (e) => {
    this.setState({ query: e.target.value });
    _.debounce(() => {
      this.props.searchAttractions(this.state.query);
    }, 300)();
  };

  renderResults = () => {
    if (!this.props.attractionsSearchResults) return "";
    let results = this.props.attractionsSearchResults;
    return (
      <ul>
        {results.map(({ name, _id }) => {
          return <li key={_id}><Link to={`/attractions/${_id}`}>{name}</Link> </li>;
        })}
      </ul>
    );
  };

  render() {
    return (
      <div>
        <input
          onChange={this.onQueryChange}
          value={this.state.query}
          type="text"
        />
        <div>{this.renderResults()}</div>
      </div>
    );
  }
}

export default connect(
  ({ attractionsSearchResults }) => {
    return { attractionsSearchResults: _.values(attractionsSearchResults) };
  },
  { searchAttractions }
)(Search);
