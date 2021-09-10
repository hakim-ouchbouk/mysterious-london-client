import React from "react";
import { connect } from "react-redux";
import { editAttraction, getAttraction } from "../../actions";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
      images: null,
    };
  }

  componentDidMount = () => {
    this.props.getAttraction(this.props.match.params.id);
    setTimeout(() => {
      let { name, description, location } = this.props.attraction;
      this.setState({ name, description, location });
    }, 300);
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
    this.props.editAttraction({ ...this.state, _id });
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
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            onChange={this.onDescriptionChange}
            value={this.state.description}
          />
          <br />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            onChange={this.onLocationChange}
            value={this.state.location}
          />
          <br />
          <label htmlFor="images">image:</label>
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
  ({ attractions }, ownProps) => {
    return { attraction: attractions[ownProps.match.params.id] };
  },
  { getAttraction, editAttraction }
)(Edit);
