import React from "react";
import { Media } from "reactstrap";
import { Loading } from "../Common/LoadingComponent";
import { baseUrl } from "../../shared/baseUrl";

const RenderLeaders = props => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  return (
    <Media list>
      {props.leaders.map(leader => {
        return (
          <Media style={{ marginTop: "32px" }}>
            <Media left style={{ marginRight: "60px" }}>
              <Media
                object
                src={baseUrl + leader.image}
                alt={leader.name}
                className="img-fluid jsjoe-avatar rounded-circle shadow"
                style={{ width: "150px" }}
              />
            </Media>
            <Media body>
              <Media heading>{leader.designation}</Media>
              <p class="text-justify">{leader.description}</p>
            </Media>
          </Media>
        );
      })}
    </Media>
  );
};

export default RenderLeaders;
