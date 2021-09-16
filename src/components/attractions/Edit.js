import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { editAttraction, getAttraction, getAdresses } from "../../actions";
import history from "../../history";
import validateAttraction from "../../validation/validateAttration";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      location: null,
      images: null,
      deleteImages: [],
      term: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.name == null && nextProps.attraction) {
      let { name, description, location } = nextProps.attraction;
      return { name, description, location, term: location };
    }
    return null;
  }

  componentDidMount = () => {
    this.props.getAttraction(this.props.match.params.id);
  };

  onTermChange = (e) => {
    this.setState({ term: e.target.value });

    _.debounce(() => {
      this.props.getAdresses(this.state.term);
    }, 400)();
  };

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  onImageChange = (e) => {
    this.setState({ images: e.target.files });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { _id } = this.props.attraction;
    let { name, location, description } = this.state;

    if (!validateAttraction.validate({ name, location, description }).error) {
      this.props.editAttraction({ ...this.state, _id });
    } else {
      alert(validateAttraction.validate(this.state).error);
    }
    this.setState({ location: "" });

  };

  renderImages = (images) => {
    if (images) {
      return images.map((image) => {
        return (
          <img
            onClick={() => {
              let deleteImages = [...this.state.deleteImages];
              let index = deleteImages.indexOf(image.public_id);
              if (index < 0) {
                deleteImages.push(image.public_id);
                this.setState({ deleteImages });
              } else {
                deleteImages.splice(index, 1);
                this.setState({ deleteImages });
              }
            }}
            key={image.public_id}
            src={image.url}
            alt={image.public_id}
            style={{ width: "200px", height: "200px" }}
          />
        );
      });
    }

    return "";
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

  render() {
    if (!this.props.user.loggedIn) {
      history.push("/");
    }

    if (!this.props.attraction) return "loading...";

    return (
      <div>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div>
            Select To Delete Images:
            <div>
              {this.props.attraction &&
                this.renderImages(this.props.attraction.images)}
            </div>
          </div>
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

          <label htmlFor="images">Upload other images:</label>
          <input
            onChange={this.onImageChange}
            type="file"
            name="images"
            multiple
          />
          <br />
          <button type="submit">Edit Attraction</button>
        </form>
      </div>
    );
  }
}

export default connect(
  ({ attractions, user, addresses }, ownProps) => {
    return {
      attraction: attractions[ownProps.match.params.id],
      user,
      addresses,
    };
  },
  { getAttraction, editAttraction, getAdresses }
)(Edit);
