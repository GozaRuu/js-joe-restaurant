import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mr-3">{this.props.user.user.username}</div>
        <Link to="/">
          <Button outline onClick={this.props.user.logoutUser}>
            <FontAwesomeIcon icon={faUserCircle} /> Logout
            {this.props.isFetching ? (
              <span className="fa fa-spinner fa-pulse fa-fw" />
            ) : null}
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default Profile;
