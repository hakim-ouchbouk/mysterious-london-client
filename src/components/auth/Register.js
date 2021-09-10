import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
  };

  usernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            value={this.state.username}
            onChange={this.usernameChange}
            name="username"
            type="text"
          />
          <br />
          <label htmlFor="password">password:</label>
          <input
            value={this.state.password}
            onChange={this.passwordChange}
            name="password"
            type="password"
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { register })(Register);
