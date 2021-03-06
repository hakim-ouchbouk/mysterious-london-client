import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../history";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Header from "./Header";
import Create from "./attractions/Create";
import AttractionsList from "./attractions/AttractionsList";
import AttractionDetails from "./attractions/AttractionDetails";
import myAttractions from "./attractions/myAttractions";
import Search from "./attractions/Search";
import Edit from "./attractions/Edit";
import { connect } from "react-redux";
import { isLoggedIn } from "../actions";
import AttractionsMap from "./attractions/AttractionsMap";
import GlobalStyles from "../styles/GlobalStyles";


class App extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }

  render() {
    return (
      <Router history={history}>
        <GlobalStyles />
        <Header  />
          <Switch>
            <Route exact path="/" component={AttractionsList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/attractions/search" component={Search} />
            <Route exact path="/attractions/map" component={AttractionsMap} />
            <Route exact path="/attractions/:id/edit" component={Edit} />
            <Route
              exact
              path="/attractions/:id"
              component={AttractionDetails}
            />
            <Route exact path="/myattractions" component={myAttractions} />
            <Route path="*" component={() => <h2>PAGE NOT FOUND</h2>} />
          </Switch>
      </Router>
    );
  }
}

export default connect(null, { isLoggedIn })(App);
