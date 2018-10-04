import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';


class Dishdetail extends Component {
    render() {
        const renderDish = (dish) => {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        const renderComments = (comments) => {
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <li>
                                    {comment.comment}
                                    <ul className="list-unstyled">
                                        <li className="list-inline-item">{`-- ${comment.author}, `}</li>
                                        <li className="list-inline-item">{comment.date}</li>
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
        if(this.props.dish != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {renderComments(this.props.dish.comments)}
                    </div>

                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default Dishdetail;
