import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { searchAttractions } from "../../actions";
import {
  Container as ResultsWrapper,
  AttractionCard,
  AttractionImg,
  CardContent,
  CenterText,
} from "../styledComponents/attractionsList";

import { MainContainer } from "../styledComponents/general";
import { Input, Title } from "../styledComponents/search";

class Search extends React.Component {
  state = {
    query: "",
  };

  onQueryChange = (e) => {
    this.setState({ query: e.target.value });
    _.debounce(() => {
      this.props.searchAttractions(this.state.query);
    }, 300)();
  };

  renderAttractions = () => {
    if (!this.props.attractions) return "";
    return (
      <ResultsWrapper>
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
      </ResultsWrapper>
    );
  };

  render() {
    return (
      <MainContainer>
        <CenterText>
          <Title>Search</Title>
        </CenterText>

        <Input
          onChange={this.onQueryChange}
          value={this.state.query}
          type="text"
          placeholder="Search for destinations"
        />
        <div>{this.renderAttractions()}</div>
      </MainContainer>
    );
  }
}

export default connect(
  ({ attractionsSearchResults }) => {
    return { attractions: _.values(attractionsSearchResults) };
  },
  { searchAttractions }
)(Search);
