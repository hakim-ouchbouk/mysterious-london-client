import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import history from "../../history";
import { createAttraction, getAdresses, isLoggedIn } from "../../actions";
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
import { MainContainer } from "../styledComponents/general";

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
    if (
      !validateAttraction.validate({ name, location, description }).error &&
      this.state.images
    ) {
      this.props.createAttraction(this.state);
      this.setState({ location: "" });
    } else {
      alert(validateAttraction.validate({ name, location, description }).error);
      if (!this.state.images) alert("you must upload an image");
    }
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

  renderForm() {
    if (!this.props.user.loggedIn) {
      history.push("/");
    }
    return (
      <div>
        <CenterText>
          <Title>Add Attraction</Title>
        </CenterText>
        <Container>
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                onChange={this.onNameChange}
                value={this.state.name}
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
              />
            </div>
            {this.props.addresses.length > 0 && this.renderAdressDropdown()}
            <div>
              <Label htmlFor="image">Upload images</Label>
              <Input
              style={{backgroundColor:"white"}}
                onChange={this.onImageChange}
                type="file"
                name="images"
                multiple
              />
            </div>
            <Button type="submit">Add Attraction</Button>
          </form>
        </Container>
      </div>
    );
  }

  render() {
    return <MainContainer>{this.renderForm()}</MainContainer>;
  }
}

export default connect(
  ({ addresses, user }) => {
    return { addresses, user };
  },
  { createAttraction, getAdresses, isLoggedIn }
)(Create);
