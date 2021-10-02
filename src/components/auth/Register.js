import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../validation/validateUser";
import history from "../../history";
import {
  Container,
  Title,
  Input,
  Label,
  Button,
  CenterText,
  Error,
} from "../styledComponents/authPage";
import { MainContainer } from "../styledComponents/general";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    usernameError: "",
    passwordError: "",
    emailError: "",
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
    let usernameError = validateUsername.validate({
      username: this.state.username,
    }).error;
    let passwordError = validatePassword.validate({
      password: this.state.password,
    }).error;

    let emailError = validatePassword.validate({
      password: this.state.email,
    }).error;

    if (!usernameError && !passwordError && !emailError) {
      this.props.register(this.state);
    } else {
      if (usernameError)
        this.setState({ usernameError: usernameError.details[0].message });
      if (passwordError) {
        this.setState({ passwordError: passwordError.details[0].message });
      }
      if (emailError) {
        this.setState({ emailError: emailError.details[0].message });
      }
    }
  };

  render() {
    if (this.props.user && this.props.user.loggedIn) history.push("/");

    return (
      <MainContainer>
        <CenterText>
          <Title>Register</Title>
        </CenterText>

        <Container>
          <form onSubmit={this.handleSubmit}>
            <div>
              <Label htmlFor="username">Email</Label>
              <Input
                value={this.state.email}
                onChange={this.emailChange}
                name="email"
                type="text"
                onBlur={(e) => {
                  if (validateEmail.validate({ email: e.target.value }).error) {
                    this.setState({
                      emailError: validateEmail.validate({
                        email: e.target.value,
                      }).error.details[0].message,
                    });
                  } else {
                    this.setState({ emailError: "" });
                  }
                }}
              />
              <Error>{this.state.emailError}</Error>
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                value={this.state.username}
                onChange={this.usernameChange}
                name="username"
                type="text"
                onBlur={(e) => {
                  if (
                    validateUsername.validate({ username: e.target.value })
                      .error
                  ) {
                    this.setState({
                      usernameError: validateUsername.validate({
                        username: e.target.value,
                      }).error.details[0].message,
                    });
                  } else {
                    this.setState({ usernameError: "" });
                  }
                }}
              />
              <Error>{this.state.usernameError}</Error>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                value={this.state.password}
                onChange={this.passwordChange}
                name="password"
                type="password"
                onBlur={(e) => {
                  if (
                    validatePassword.validate({ password: e.target.value })
                      .error
                  ) {
                    console.log();
                    this.setState({
                      passwordError: validatePassword.validate({
                        password: e.target.value,
                      }).error.details[0].message,
                    });
                  } else {
                    this.setState({ passwordError: "" });
                  }
                }}
              />
              <Error>{this.state.passwordError}</Error>
            </div>
            <Button type="submit">Register</Button>
          </form>
        </Container>
      </MainContainer>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
  { register }
)(Register);
