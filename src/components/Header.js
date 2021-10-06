import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { logout, googleAuth } from "../actions";

import LogoutGoogle from "./auth/LogoutGoogle";
import { Brand, NavItem } from "./styledComponents/header";

class Header extends React.Component {
  renderGoogleLogout = () => {
    if (!this.props.user.loggedIn || !this.props.user.oauth) return "";
    return <LogoutGoogle />;
  };

  render() {
    return (
      <Navbar sticky="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Brand>Arcane London</Brand>
          </Navbar.Brand>
          <Navbar.Toggle color='red' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <NavItem>Attractions</NavItem>
              </Nav.Link>
              <Nav.Link as={Link} to="/attractions/map">
                <NavItem>Map</NavItem>
              </Nav.Link>

              {this.props.user.loggedIn && (
                <Nav.Link as={Link} to="/create">
                  <NavItem>Add Attraction</NavItem>
                </Nav.Link>
              )}
              {this.props.user.loggedIn && (
                <Nav.Link as={Link} to="/myattractions">
                  <NavItem>Lists</NavItem>
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/attractions/search">
                <NavItem>Search</NavItem>
              </Nav.Link>
              {!this.props.user.loggedIn && (
                <Nav.Link as={Link} to="/register">
                  <NavItem>Register</NavItem>
                </Nav.Link>
              )}
              {this.props.user.loggedIn && !this.props.user.oauth && (
                <Nav.Link
                  onClick={() => {
                    this.props.logout();
                  }}
                >
                  <NavItem>Logout</NavItem>
                </Nav.Link>
              )}
              {!this.props.user.loggedIn && (
                <Nav.Link as={Link} to="/login">
                  <NavItem>Login</NavItem>
                </Nav.Link>
              )}

              {this.props.user.loggedIn && this.props.user.oauth && (
                <Nav.Link>
                  <NavItem>
                    <LogoutGoogle />
                  </NavItem>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
  { logout, googleAuth }
)(Header);
