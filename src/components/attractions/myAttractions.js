import React from "react";
import { connect } from "react-redux";
import { getUserAttractions } from "../../actions";
import { Link } from "react-router-dom";

class MyAttractions extends React.Component {
  renderList = (list) => {
    if (!list) return "";
    return (
      <ul>
        {list.map(({ name, _id }) => {
          return <li key={_id}><Link to={`/attractions/${_id}`}>{name}</Link> </li>;
        })}
      </ul>
    );
  };

  componentDidMount() {
    this.props.getUserAttractions();
  }

  render() {
    return (
      <div>
        <h3>Want To Visit</h3>
        {this.renderList(this.props.user.wantToVisit)}
        <h3>Been There</h3>
        {this.renderList(this.props.user.beenThere)}
        <h3>List</h3>
        {this.renderList(this.props.user.list)}
      </div>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
  { getUserAttractions }
)(MyAttractions);
