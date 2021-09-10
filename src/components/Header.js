import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";

class Header extends React.Component {
  renderLogOut = () => {
    if (!this.props.user.loggedIn) return "";
    return (
      <button
        onClick={() => {
          this.props.logout();
        }}
      >
        Log out
      </button>
    );
  };

  render() {
    return (
      <div>
        <br />
        {this.props.user && this.props.user.username}
        <br />
        <Link to="/">Attractions</Link>
        <br />
        {!this.props.user.loggedIn && (
          <Link to="/register">
            Register <br />
          </Link>
        )}

        {!this.props.user.loggedIn && (
          <Link to="/login">
            Login
            <br />
          </Link>
        )}

        {this.props.user.loggedIn && (
          <Link to="/create">
            Add Attraction
            <br />
          </Link>
        )}

        {this.props.user.loggedIn && (
          <Link to="/myattractions">My Attractions<br /></Link>
        )}
        
        <Link to="/attractions/search">Search<br /></Link>
        
        {this.renderLogOut()}
      </div>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
  { logout }
)(Header);
