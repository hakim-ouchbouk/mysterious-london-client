import React from "react";
import { login } from "../../actions";
import { connect } from "react-redux";

class Login extends React.Component {
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
    this.props.login(this.state);
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
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
