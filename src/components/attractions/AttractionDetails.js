import React from "react";
import { connect } from "react-redux";
import Map from "../Map";
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
import { Button } from "react-bootstrap";

import validateReview from "../../validation/validateReview";

class AttractionDetails extends React.Component {
  state = {
    review: "",
    stars: 1,
  };

  componentDidMount() {
    this.props.getAttraction(this.props.match.params.id);
    if (this.props.user.loggedIn) this.props.getUserAttractions();
  }

  renderReviews = () => {
    if (this.props.attraction.reviews.length < 1) return "";

    return (
      <div>
        <h3>Reviews:</h3>
        <ul>
          {this.props.attraction.reviews.map(
            ({ content, _id, stars, author }) => {
              return (
                <li key={_id}>
                  {author.username}
                  <br />
                  stars:{stars}
                  <br />
                  {content}
                  <br />
                  {this.props.user.loggedIn && this.props.user.id === author._id && (
                    <Button
                      onClick={() => {
                        this.props.deleteAttrationReview({
                          attractionId: this.props.attraction._id,
                          reviewId: _id,
                        });
                      }}
                    >
                      delete
                    </Button>
                  )}
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  };

  renderAddReview = () => {
    let handleSubmitReview = (e) => {
      e.preventDefault();
      let attractionId = this.props.attraction._id;

      if (!validateReview.validate({ content: this.state.review }).error) {
        this.props.addAttractionReview({
          attractionId,
          content: this.state.review,
          stars: this.state.stars,
        });
        this.setState({ review: "" });
      } else {
        alert(validateReview.validate({ content: this.state.review }).error);
      }
    };

    if (!this.props.user.loggedIn) return "";

    return (
      <div>
        <form onSubmit={handleSubmitReview} method="post">
          <div>
            <label>How was your experience?</label>
            <input
              onChange={(e) => {
                this.setState({ stars: e.target.value });
              }}
              value={this.state.stars}
              type="range"
              id="stars"
              name="stars"
              min="1"
              max="5"
            />
          </div>
          <textarea
            value={this.state.review}
            onChange={(e) => {
              this.setState({ review: e.target.value });
            }}
            name="review"
            id="review"
            cols="30"
            rows="10"
          ></textarea>
          <Button type="submit">Add Review</Button>
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
      <Button
        variant="danger"
        onClick={() => {
          this.props.deleteAttraction(this.props.attraction._id);
        }}
      >
        Delete
      </Button>
    );
  };

  renderEditButton = () => {
    if (
      !this.props.user.loggedIn ||
      this.props.user.id !== this.props.attraction.addedBy
    )
      return "";
    return (
      <Button variant="warning">
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/attractions/${this.props.attraction._id}/edit`}
        >
          Edit
        </Link>
      </Button>
    );
  };

  renderButtons = (_id) => {
    if (!this.props.user.loggedIn) return "";
    return (
      <div>
        <Button
          onClick={() => {
            this.props.addToWantToVisit(_id);
          }}
        >
          Want To go
        </Button>
        <Button
          onClick={() => {
            this.props.addToBeenThere(_id);
          }}
        >
          Been There
        </Button>
        <Button
          onClick={() => {
            this.props.addToList(_id);
          }}
        >
          Add To List
        </Button>
      </div>
    );
  };

  renderImages = (images) => {
    if (images.length > 0) {
      return images.map(({ url, public_id }, i) => {
        return (
          <img
            key={public_id}
            src={url}
            alt={public_id}
            style={{ width: "200px", height: "200px" }}
          />
        );
      });
    }

    return "";
  };

  renderAttraction = () => {
    if (this.props.attraction) {
      let {
        name,
        description,
        images,
        location,
        _id,
        geocode,
        visited,
        wantToVisit,
      } = this.props.attraction;
      return (
        <div>
          <h2> {name} </h2>
          <div>{wantToVisit} want to visit</div>
          <div>{visited} visited</div>
          <div>{this.renderImages(images)}</div>
          <br />
          <Map geocode={geocode} />
          <br />
          {this.renderButtons(_id)}
          {this.renderEditButton(_id)}
          {this.renderDeleteButton()}
          <br />
          <h3> {location}</h3>
          <br />
          <p>{description}</p>
          {this.renderAddReview()}
          {this.renderReviews()}
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
  ({ attractions, user }, ownProps) => {
    return { attraction: attractions[ownProps.match.params.id], user };
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
