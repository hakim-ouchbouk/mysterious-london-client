import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import _ from "lodash";

import {
  getAttractions,
  getAllAttractions,
  getAttractionCount,
} from "../../actions";

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
      <Container className="mt-5" fluid>
        <Row>
          {this.props.attractions.map(({ name, _id, images, description }) => {
            return (
              <Col className="mb-4" key={_id}>
                <Card style={{ width: "14rem" }}>
                  <Card.Img
                    variant="top"
                    src={images[0].url}
                    style={{ height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description.substring(0, 100)}</Card.Text>
                    <Button variant="primary">
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to={`/attractions/${_id}`}
                      >
                        Read More..
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row>
            {this.renderGetAllButton()}
        </Row>
      </Container>
    );
  };

  renderGetAllButton = () => {
    // if (
    //   !this.props.attractions ||
    //   this.props.count <= 3 ||
    //   this.props.attractions.length > 3
    // )
    //   return "";
    return (
      <Button className='col mb-5 text-center'
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
      <div>
        {this.renderAttractions()}
      </div>
    );
  }
}

export default connect(
  ({ attractions, attractionsCount }) => {
    return {
      attractions: _.values(attractions),
      count: attractionsCount.count,
    };
  },
  { getAttractions, getAllAttractions, getAttractionCount }
)(AttractionsList);
