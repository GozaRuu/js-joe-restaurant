import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "../Common/LoadingComponent";
import { baseUrl } from "../../shared/baseUrl";

const Menu = props => {
  if (props.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishes.errMess}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {props.dishes.dishes.map(dish => {
          return (
            <div key={dish._id} className="col-12 col-md-5 m-1">
              <Card>
                <Link to={`/menu/${dish._id}`}>
                  <CardImg
                    width="100%"
                    src={baseUrl + dish.image}
                    alt={dish.name}
                  />
                  <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Link>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
