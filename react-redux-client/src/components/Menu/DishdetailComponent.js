import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "../Common/LoadingComponent";
import { baseUrl } from "../../shared/baseUrl";

const RenderDish = ({ dish }) => {
  return (
    <Card>
      <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
};

const RenderComments = ({ comments }) => {
  const parseDate = dateString =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(Date.parse(dateString)));
  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map(comment => {
          return (
            <li>
              <p>{comment.comment}</p>
              <p>{`-- ${comment.author}, ${parseDate(comment.date)}`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleCommentSubmit(values) {
    this.props.toggle();
    // alert(`${values.rating}, ${values.author}, ${values.comment}`)
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    const required = val => val && val.length;
    const maxLength = len => val => !val || val.length <= len;
    const minLength = len => val => val && val.length >= len;

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader>Comment on this dish</ModalHeader>
        <ModalBody>
          <div className="container">
            <LocalForm onSubmit={values => this.handleCommentSubmit(values)}>
              <Row className="form-group">
                <div className="form-check">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    className="form-control"
                    model=".rating"
                    id="rating"
                    name="rating"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </div>
              </Row>
              <Row class="form-group">
                <Label htmlFor="author">Author</Label>
                <Control.text
                  className="form-control"
                  model=".author"
                  id="author"
                  name="author"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required Field ",
                    minLength: "The length must be between 3 and 15 character ",
                    maxLength: "The length must be between 2 and 15 character "
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  className="form-control"
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="3"
                />
              </Row>
              <Button type="submit" value="submit" className="bg-primary">
                Add Comment
              </Button>
            </LocalForm>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>{this.props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={this.props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={this.props.comments} />
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-pencil fa-lg"> Add Comment</span>
            </Button>
            <CommentForm
              isOpen={this.state.isModalOpen}
              toggle={this.toggleModal}
              dishId={this.props.dish.id}
              addComment={this.props.addComment}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dishdetail;
