import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions";
import registerValidation from "../../validation/validateUser";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
  };

  usernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerValidation.validate(this.state));
    if (!registerValidation.validate(this.state).error) {
      this.props.register(this.state);
    } else {
      alert("WRONG INPUT");
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Email:</label>
          <input
            value={this.state.email}
            onChange={this.emailChange}
            name="email"
            type="text"
          />
          <br />
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
