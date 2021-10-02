import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { editAttraction, getAttraction, getAdresses } from "../../actions";
import history from "../../history";
import validateAttraction from "../../validation/validateAttration";

import {
  Input,
  Label,
  Container,
  Button,
  TextArea,
  Select,
  CenterText,
  Title,
} from "../styledComponents/createAttraction";

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
            style={{
              width: "100px",
              height: "auto",
              marginRight: "10px",
              opacity: `${
                this.state.deleteImages.indexOf(image.public_id) < 0
                  ? ""
                  : "0.3"
              }`,
            }}
          />
        );
      });
    }

    return "";
  };

  renderAdressDropdown = () => {
    return (
      <Select onClick={this.onLocationChange}>
        {this.props.addresses.map(({ address }, i) => {
          return (
            <option key={i} value={address}>
              {address}
            </option>
          );
        })}
      </Select>
    );
  };

  render() {
    if (!this.props.user.loggedIn) {
      history.push("/");
    }

    if (!this.props.attraction) return "loading...";

    return (
      <div>
        <CenterText>
          <Title>Edit Attraction</Title>
        </CenterText>
        <Container style={{ width: "50%", marginBottom: "50px" }}>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div>
              <Label style={{ marginBottom: "20px" }}>
                Select To Delete Images:
              </Label>
              <div>
                {this.props.attraction &&
                  this.renderImages(this.props.attraction.images)}
              </div>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                onChange={this.onNameChange}
                value={this.state.name}
                autoComplete="off"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <TextArea
                name="description"
                onChange={this.onDescriptionChange}
                value={this.state.description}
              />
            </div>
            <div>
              <Label htmlFor="location">Address</Label>
              <Input
                type="text"
                name="location"
                onChange={this.onTermChange}
                value={this.state.term}
                autoComplete="off"
              />
            </div>
            {this.props.addresses.length > 0 && this.renderAdressDropdown()}

            <div>
              <Label htmlFor="image">Upload images</Label>
              <Input
                style={{ backgroundColor: "white" }}
                onChange={this.onImageChange}
                type="file"
                name="images"
                multiple
              />
            </div>
            <Button type="submit">Edit Attraction</Button>
          </form>
        </Container>
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
