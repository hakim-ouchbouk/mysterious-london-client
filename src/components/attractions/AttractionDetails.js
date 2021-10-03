import React from "react";
import { connect } from "react-redux";
import Map from "../Map";
import StarRatings from "react-star-ratings";

import {
  getAttraction,
  addAttractionReview,
  deleteAttrationReview,
  addToWantToVisit,
  addToBeenThere,
  addToList,
  deleteAttraction,
  getUserAttractions,
} from "../../actions";
import { Link } from "react-router-dom";
import {
  AddReview,
  Author,
  BodyContainer,
  Btn,
  Delete,
  DeleteButton,
  Description,
  Edit,
  Face,
  Flag,
  FlashMessage,
  Header,
  Img,
  ImgsContainer,
  ImgsWrapper,
  Label,
  LeftBtn,
  List,
  LoginButton,
  MapContainer,
  Rating,
  RegisterButton,
  Review,
  ReviewButton,
  Reviews,
  RightBtn,
  SmallContainer,
  Star,
  Stars,
  TextArea,
  Title,
} from "../styledComponents/attractionDetails";
import validateReview from "../../validation/validateReview";
import { MainContainer } from "../styledComponents/general";
import history from "../../history";

class AttractionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      stars: 0,
    };
    this.imgsContainer = React.createRef();
  }

  componentDidMount() {
    this.props.getAttraction(this.props.match.params.id);
    if (this.props.user.loggedIn) this.props.getUserAttractions();
  }

  renderReviews = () => {
    if (this.props.attraction.reviews.length < 1) return "";

    return (
      <Reviews>
        <h3 className="title">Reviews</h3>
        <ul>
          {this.props.attraction.reviews.map(
            ({ content, _id, stars, author }) => {
              return (
                <Review key={_id}>
                  <Author>
                    <Face />
                    <p className="name">{author.username}</p>
                    {this.props.user.loggedIn &&
                      this.props.user.id === author._id && (
                        <DeleteButton
                          onClick={() => {
                            this.props.deleteAttrationReview({
                              attractionId: this.props.attraction._id,
                              reviewId: _id,
                            });
                          }}
                        >
                          delete
                        </DeleteButton>
                      )}
                  </Author>

                  <Rating>
                    <StarRatings
                      rating={stars}
                      starDimension="16px"
                      starSpacing="5px"
                      starRatedColor="#065f46"
                    />
                  </Rating>
                  <p className="content">{content}</p>
                </Review>
              );
            }
          )}
        </ul>
      </Reviews>
    );
  };

  changeRating = (stars) => {
    this.setState({ stars });
  };

  renderAddReview = () => {
    if (!this.props.user.loggedIn) {
      return (
        <div>
          <Label>Log in or register to leave a review</Label>

          <LoginButton>
            <Link className="link" to="/login">
              Login
            </Link>
          </LoginButton>
          <RegisterButton>
            <Link className="link" to="/register">
              Register
            </Link>
          </RegisterButton>
        </div>
      );
    }

    let handleSubmitReview = (e) => {
      e.preventDefault();
      let attractionId = this.props.attraction._id;

      if (!validateReview.validate({ content: this.state.review }).error) {
        this.props.addAttractionReview({
          attractionId,
          content: this.state.review,
          stars: this.state.stars,
        });
        this.setState({ review: "", stars: 0 });
      } else {
        alert(validateReview.validate({ content: this.state.review }).error);
      }
    };

    return (
      <div>
        <form onSubmit={handleSubmitReview} method="post">
          <div>
            <Label>How was your experience?</Label>

            <Stars>
              <StarRatings
                rating={this.state.stars}
                starRatedColor=" #065f46"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="rating"
                starHoverColor=" #065f46"
                starDimension="32px"
              />
            </Stars>
          </div>
          <TextArea
            className="text-area"
            value={this.state.review}
            onChange={(e) => {
              this.setState({ review: e.target.value });
            }}
            name="review"
            id="review"
            cols="30"
            rows="10"
          ></TextArea>
          <ReviewButton type="submit">Add Review</ReviewButton>
        </form>
      </div>
    );
  };

  renderDeleteButton = () => {
    if (
      !this.props.user ||
      this.props.user.id !== this.props.attraction.addedBy
    )
      return "";
    return (
      <Delete
        variant="danger"
        onClick={() => {
          this.props.deleteAttraction(this.props.attraction._id);
        }}
      >
        Delete
      </Delete>
    );
  };

  renderEditButton = () => {
    if (
      !this.props.user.loggedIn ||
      this.props.user.id !== this.props.attraction.addedBy
    )
      return "";
    return (
      <Edit variant="warning">
        <Link
          className="link"
          to={`/attractions/${this.props.attraction._id}/edit`}
        >
          Edit
        </Link>
      </Edit>
    );
  };

  renderButtons = (_id) => {
    let { visited, wantToVisit } = this.props.attraction;
    return (
      <div
        onClick={() => {
          if (!this.props.user.loggedIn) history.push("/login");
        }}
      >
        <Btn
          onClick={() => {
            this.props.addToWantToVisit(_id);
          }}
        >
          <Star />
          <p>Want to Vist</p>
          <p className="number">{wantToVisit}</p>
        </Btn>
        <Btn
          onClick={() => {
            this.props.addToBeenThere(_id);
          }}
        >
          <Flag />
          <p>Been There</p>
          <p className="number">{visited}</p>
        </Btn>
        <Btn
          onClick={() => {
            this.props.addToList(_id);
          }}
        >
          <List />
          <p>Add to List</p>
        </Btn>
      </div>
    );
  };

  renderImages = (images) => {
    if (images.length > 0) {
      return images.map(({ url, public_id }, i) => {
        return <Img key={public_id} src={url} alt={public_id} />;
      });
    }

    return "";
  };
  sideScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  renderScroll = (container) => {
    if (!container || container.clientWidth >= container.scrollWidth)
      return false;

    return true;
  };

  renderAttraction = () => {
    if (this.props.attraction) {
      let { name, description, images, location, _id, geocode } =
        this.props.attraction;
      return (
        <div>
          <MainContainer>
            <Header>
              <div>
                <Title>
                  {name} <p className="location">{location}</p>
                  {this.props.flashMessage && (
                    <FlashMessage>{this.props.flashMessage}</FlashMessage>
                  )}
                </Title>
                {this.renderEditButton(_id)}
                {this.renderDeleteButton()}
              </div>

              <div>{this.renderButtons(_id)}</div>
            </Header>

            <ImgsWrapper>
              {this.renderScroll(this.imgsContainer.current) && (
                <LeftBtn
                  onClick={() => {
                    this.sideScroll(this.imgsContainer.current, 7, 300, -10);
                  }}
                ></LeftBtn>
              )}

              {this.renderScroll(this.imgsContainer.current) && (
                <RightBtn
                  onClick={() => {
                    this.sideScroll(this.imgsContainer.current, 7, 300, 10);
                  }}
                ></RightBtn>
              )}
              <ImgsContainer ref={this.imgsContainer}>
                {this.renderImages(images)}
              </ImgsContainer>
            </ImgsWrapper>
          </MainContainer>
          <BodyContainer>
            <SmallContainer>
              <div>
                <Description>{description}</Description>
              </div>
              <MapContainer>
                <Map geocode={geocode} />
              </MapContainer>

              <AddReview>{this.renderAddReview()}</AddReview>
              <Reviews>{this.renderReviews()}</Reviews>
            </SmallContainer>
          </BodyContainer>
        </div>
      );
    } else {
      return "LOADING...";
    }
  };

  render() {
    return <div>{this.renderAttraction()}</div>;
  }
}

export default connect(
  ({ attractions, user, flashMessage }, ownProps) => {
    return {
      attraction: attractions[ownProps.match.params.id],
      user,
      flashMessage: flashMessage.data,
    };
  },
  {
    getAttraction,
    addAttractionReview,
    deleteAttrationReview,
    addToWantToVisit,
    addToBeenThere,
    addToList,
    deleteAttraction,
    getUserAttractions,
  }
)(AttractionDetails);
