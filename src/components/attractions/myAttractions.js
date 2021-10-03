import React from "react";
import { connect } from "react-redux";
import { getUserAttractions } from "../../actions";
import { Link } from "react-router-dom";
import { MainContainer } from "../styledComponents/general";
import history from "../../history";

import {
  Container as ListWrapper,
  AttractionCard,
  AttractionImg,
  CardContent,
  Title,
} from "../styledComponents/attractionsList";

class MyAttractions extends React.Component {
  componentDidMount() {
    this.props.getUserAttractions();
  }

  renderAttractions = (attractions) => {
    if (!attractions || attractions.length === 0) {
      return <p style={{fontSize:'25px'}}>Nothing yet</p>;
    }
    return (
      <ListWrapper>
        {attractions.map(({ name, description, _id, images }) => {
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
      </ListWrapper>
    );
  };

  render() {
    if (!this.props.user.loggedIn) {
      history.push("/");
    }

    return (
      <MainContainer>
        <Title>Places Where You Want To Go</Title>
        {this.renderAttractions(this.props.user.wantToVisit)}
        <Title>Places Where You've been</Title>
        {this.renderAttractions(this.props.user.beenThere)}
        <Title>Your List </Title>
        {this.renderAttractions(this.props.user.list)}
      </MainContainer>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
  { getUserAttractions }
)(MyAttractions);
