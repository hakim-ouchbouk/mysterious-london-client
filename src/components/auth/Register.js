import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions";
import registerValidation from "../../validation/validateUser";
import history from '../../history'
import {
  Container,
  Title,
  Input,
  Label,
  Button,
  CenterText,
} from "../styledComponents/authPage";
import { MainContainer } from "../styledComponents/general";

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
    
    if (this.props.user && this.props.user.loggedIn) history.push("/");

    return (
      <MainContainer>
        <CenterText>
          <Title>Register</Title>
        </CenterText>

        <Container>
          <form onSubmit={this.handleSubmit}>
            <Label htmlFor="username">Email</Label>
            <Input
              value={this.state.email}
              onChange={this.emailChange}
              name="email"
              type="text"
            />
            <Label htmlFor="username">Username</Label>
            <Input
              value={this.state.username}
              onChange={this.usernameChange}
              name="username"
              type="text"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              value={this.state.password}
              onChange={this.passwordChange}
              name="password"
              type="password"
            />
            <Button type="submit">Register</Button>
          </form>
        </Container>
      </MainContainer>
    );
  }
}

export default connect(({user})=>{
   return {user}
}, { register })(Register);
