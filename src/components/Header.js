import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { logout, googleAuth } from "../actions";

import LogoutGoogle from "./auth/LogoutGoogle";

class Header extends React.Component {


  renderGoogleLogout = () => {
    if (!this.props.user.loggedIn || !this.props.user.oauth) return "";
    return <LogoutGoogle />;
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container style={{ textDecoration: "none" }}>
          <Navbar.Brand as={Link} to="/">
            Arcane London
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Attractions
              </Nav.Link>
              <Nav.Link as={Link} to="/attractions/map">
                Map
              </Nav.Link>
              {!this.props.user.loggedIn && (
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              )}
              {this.props.user.loggedIn && (
                <Nav.Link as={Link} to="/create">
                  Add Attraction
                </Nav.Link>
              )}
              {this.props.user.loggedIn && (
                <Nav.Link as={Link} to="/myattractions">
                  {this.props.user.username}
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/attractions/search">
                Search
              </Nav.Link>
              {/* {this.props.user && this.props.user.username && (
                <Nav.Link>{this.props.user.username}</Nav.Link>
              )} */}
              {this.props.user.loggedIn && !this.props.user.oauth && (
                <Nav.Link
                  onClick={() => {
                    this.props.logout();
                  }}
                >
                  Logout
                </Nav.Link>
              )}
              {!this.props.user.loggedIn && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}

              {/* {!this.props.user.loggedIn && (
                <Nav.Link>
                  <LoginGoogle
                    text={
                      <p>
                        Login with <IoLogoGoogle />
                      </p>
                    }
                  />
                </Nav.Link>
              )} */}

              {this.props.user.loggedIn && this.props.user.oauth && (
                <Nav.Link>
                  <LogoutGoogle />
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
