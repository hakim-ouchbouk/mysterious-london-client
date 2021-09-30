import React from "react";
import { login } from "../../actions";
import { connect } from "react-redux";
import history from "../../history";
import {
  Container,
  Title,
  Input,
  Label,
  Button,
  CenterText,
} from "../styledComponents/authPage";
import { MainContainer } from "../styledComponents/general";

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
    if (this.props.user && this.props.user.loggedIn) history.push("/");
    return (
      <MainContainer>
        <CenterText>
          <Title>Login</Title>
        </CenterText>
        <Container>
          <form onSubmit={this.handleSubmit}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                value={this.state.username}
                onChange={this.usernameChange}
                name="username"
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                value={this.state.password}
                onChange={this.passwordChange}
                name="password"
                type="password"
              />
            </div>
            <Button type="submit">Login</Button>
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
  { login }
)(Login);
