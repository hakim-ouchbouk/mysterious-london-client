import React from "react";
import { connect } from "react-redux";
import { createAttraction } from "../../actions";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
      images: null,
    };
    this.fd = new FormData();
  }
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
    this.props.createAttraction(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.onNameChange}
            value={this.state.name}
          />
          <br/>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            onChange={this.onDescriptionChange}
            value={this.state.description}
          />
          <br/>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            onChange={this.onLocationChange}
            value={this.state.location}
          />
          <br/>
          <label htmlFor="image">images:</label>
          <input onChange={this.onImageChange} type="file" name="images" multiple />
          <br/>
          <button type="submit">Add Attraction</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { createAttraction })(Create);
