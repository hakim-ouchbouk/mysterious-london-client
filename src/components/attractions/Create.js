import React from "react";
import { connect } from "react-redux";
import { createAttraction, getAdresses } from "../../actions";
import _ from "lodash";

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
    this.props.createAttraction(this.state);
    this.setState({location:''})
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
    return (
      <div>
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
      </div>
    );
  }
}

export default connect(
  ({ addresses }) => {
    return { addresses };
  },
  { createAttraction, getAdresses }
)(Create);
