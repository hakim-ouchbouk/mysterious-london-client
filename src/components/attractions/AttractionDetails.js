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
} from "../../actions";
import { Link } from "react-router-dom";

class AttractionDetails extends React.Component {
  state = {
    review: "",
    stars: 1,
  };

  componentDidMount() {
    this.props.getAttraction(this.props.match.params.id);
  }

  renderReviews = () => {
    if (!this.props.attraction.reviews) return "";
    return this.props.attraction.reviews.map(
      ({ content, _id, stars, author }) => {
        return (
          <li key={_id}>
            stars:{stars}
            <br />
            {content}
            <br />
            {this.props.user.loggedIn && this.props.user.id === author && (
              <button
                onClick={() => {
                  this.props.deleteAttrationReview({
                    attractionId: this.props.attraction._id,
                    reviewId: _id,
                  });
                }}
              >
                delete
              </button>
            )}
          </li>
        );
      }
    );
  };

  renderAddReview = () => {
    let handleSubmitReview = (e) => {
      e.preventDefault();
      let attractionId = this.props.attraction._id;

      this.props.addAttractionReview({
        attractionId,
        content: this.state.review,
        stars: this.state.stars,
      });
      this.setState({ review: "" });
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
          <button type="submit">Add Review</button>
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
      <button
        onClick={() => {
          this.props.deleteAttraction(this.props.attraction._id);
        }}
      >
        Delete
      </button>
    );
  };

  renderEditButton = () => {
    if (
      !this.props.user.loggedIn ||
      this.props.user.id !== this.props.attraction.addedBy
    )
      return "";
    return (
      <button>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/attractions/${this.props.attraction._id}/edit`}
        >
          Edit
        </Link>
      </button>
    );
  };

  renderButtons = (_id) => {
    if (!this.props.user.loggedIn) return "";
    return (
      <div>
        <button
          onClick={() => {
            this.props.addToWantToVisit(_id);
          }}
        >
          Want To go
        </button>
        <button
          onClick={() => {
            this.props.addToBeenThere(_id);
          }}
        >
          Been There
        </button>
        <button
          onClick={() => {
            this.props.addToList(_id);
          }}
        >
          Add To List
        </button>
      </div>
    );
  };

  renderAttraction = () => {
    if (this.props.attraction) {
      let { name, description, imageURLs, location, _id, geocode } =
        this.props.attraction;
      return (
        <div>
          <img
            src={imageURLs[0]}
            alt={name}
            style={{ width: "200px", height: "200px" }}
          />
          <br />
          <Map location={location} geocode={geocode} />
          <br />
          <h2> {name} </h2>
          {this.renderButtons(_id)}
          {this.renderEditButton(_id)}
          {this.renderDeleteButton()}
          <br />
          <h3> {location}</h3>
          <br />
          <p>{description}</p>
          {this.renderAddReview()}
          <h3>Reviews:</h3>
          <ul>{this.renderReviews()}</ul>
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
  }
)(AttractionDetails);
