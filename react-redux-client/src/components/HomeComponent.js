import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardBody,
  CardSubtitle
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const RenderCard = ({ item, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  }
  return (
    <Card>
      <CardImg src={baseUrl + item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? (
          <CardSubtitle>{item.designation}</CardSubtitle>
        ) : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
};

const Home = props => {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishLoading}
            errMess={props.dishErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promo}
            isLoading={props.promoLoading}
            errMess={props.promoErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.leaderLoading}
            errMess={props.leaderErrMess}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
