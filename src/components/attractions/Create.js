import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import history from "../../history";

import { createAttraction, getAdresses, isLoggedIn } from "../../actions";

import validateAttraction from "../../validation/validateAttration";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
      images: null,
      term: "",
    };
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onTermChange = (e) => {
    this.setState({ term: e.target.value });

    _.debounce(() => {
      this.props.getAdresses(this.state.term);
    }, 400)();
  };

  onLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  onImageChange = (e) => {
    this.setState({ images: e.target.files });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, location, description } = this.state;
    if (!validateAttraction.validate({ name, location, description }).error && this.state.images) {
      this.props.createAttraction(this.state);
      this.setState({ location: "" });
    } else {
      
      alert(validateAttraction.validate({ name, location, description }).error);
      if(!this.state.images) alert('you must upload an image')
    }
  };

  renderAdressDropdown = () => {
    return (
      <select onClick={this.onLocationChange}>
        {this.props.addresses.map(({ address }, i) => {
          return (
            <option key={i} value={address}>
              {address}
            </option>
          );
        })}
      </select>
    );
  };

  renderForm() {
    if (!this.props.user.loggedIn) {
      history.push("/");
    }
    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={this.onNameChange}
          value={this.state.name}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          onChange={this.onDescriptionChange}
          value={this.state.description}
        />
        <br />
        <label htmlFor="location">Address:</label>
        <input
          type="text"
          name="location"
          onChange={this.onTermChange}
          value={this.state.term}
        />
        <br />
        {this.props.addresses.length > 0 && this.renderAdressDropdown()}
        <br />
        <label htmlFor="image">images:</label>
        <input
          onChange={this.onImageChange}
          type="file"
          name="images"
          multiple
        />
        <br />
        <button type="submit">Add Attraction</button>
      </form>
    );
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default connect(
  ({ addresses, user }) => {
    return { addresses, user };
  },
  { createAttraction, getAdresses, isLoggedIn }
)(Create);
