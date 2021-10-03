import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import {
  Container,
  AttractionCard,
  AttractionImg,
  CardContent,
  CenterButton,
  Button,
  CenterText,
  Title,
  FlashMessage,
} from "../styledComponents/attractionsList";

import {
  getAttractions,
  getAllAttractions,
  getAttractionCount,
} from "../../actions";
import { MainContainer } from "../styledComponents/general";

class AttractionsList extends React.Component {
  state = {
    buttonVisibilty: "",
  };

  componentDidMount() {
    this.props.getAttractions();
    this.props.getAttractionCount();
  }

  renderAttractions = () => {
    if (!this.props.attractions) return "";
    return (
      <Container>
        {this.props.attractions.map(({ name, description, _id, images }) => {
          return (
            <AttractionCard key={_id}>
              <Link className="link" to={`/attractions/${_id}`}>
                <AttractionImg src={images[0].url} alt="pic" />
                <CardContent>
                  {<p className="name">{name}</p>}
                  <p className="subtitle">{description.substring(0, 101)}...</p>
                </CardContent>
              </Link>
            </AttractionCard>
          );
        })}
      </Container>
    );
  };

  renderGetAllButton = () => {
    if (
      !this.props.attractions ||
      this.props.count <= 8 ||
      this.props.attractions.length > 8
    )
      return "";
    return (
      <Button
        style={{ visibility: this.state.buttonVisibilty }}
        onClick={() => {
          this.props.getAllAttractions();
          this.setState({ buttonVisibilty: "hidden" });
        }}
      >
        See All {this.props.count} Attractions
      </Button>
    );
  };

  render() {
    return (
      <MainContainer>
        <CenterText>
          <Title>
            All the places in London
            {this.props.flashMessage && (
              <FlashMessage>{this.props.flashMessage}</FlashMessage>
            )}
          </Title>
        </CenterText>
        {this.renderAttractions()}
        <br />
        <CenterButton>{this.renderGetAllButton()}</CenterButton>
      </MainContainer>
    );
  }
}

export default connect(
  ({ attractions, attractionsCount, flashMessage }) => {
    return {
      attractions: _.values(attractions),
      count: attractionsCount.count,
      flashMessage: flashMessage.data,
    };
  },
  { getAttractions, getAllAttractions, getAttractionCount }
)(AttractionsList);
