import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faTruckMonster,
  faSwimmer,
  faBatteryQuarter,
  faGlasses,
  faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";
class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center px-7 mb-4">
          <FontAwesomeIcon icon={faUserAstronaut} className="mr-2" size="lg" />
          <h3 className="h6 mb-0">My Account</h3>
        </div>

        <div className="jsjoe-sidebar__body">
          <header className="d-flex align-items-center jsjoe-sidebar--account__holder mt-3 mb-1">
            <div className="position-relative">
              <img
                className="jsjoe-sidebar--account__holder-img"
                src="./assets/images/100x100/img3.jpg"
                alt="profile"
              />
              <span className="jsjoe-badge jsjoe-badge--xs jsjoe-badge-border-dark jsjoe-badge-pos rounded-circle" />
            </div>
            <div className="ml-3">
              <strong>
                {this.props.user.user.username}
                <span className="badge jsjoe-badge-dark ml-1">Pro</span>
              </strong>
              <span className="jsjoe-sidebar--account__holder-text">
                Lead Support Adviser
              </span>
            </div>
          </header>

          <div>
            <ul className="list-unstyled jsjoe-sidebar--account__list">
              <li className="jsjoe-sidebar--account__list-item">
                <a
                  className="jsjoe-sidebar--account__list-link"
                  href="reviews.html"
                >
                  <div className="jsjoe-sidebar--account__list-icon">
                    <FontAwesomeIcon icon={faBicycle} />
                  </div>
                  Notifications
                  <span className="badge badge-danger float-right mt-1">5</span>
                </a>
              </li>
              <li className="jsjoe-sidebar--account__list-item">
                <a
                  className="jsjoe-sidebar--account__list-link"
                  href="profile.html"
                >
                  <div className="jsjoe-sidebar--account__list-icon">
                    <FontAwesomeIcon icon={faTruckMonster} />
                  </div>
                  Favorites
                </a>
              </li>
            </ul>

            <div className="jsjoe-sidebar--account__list-divider" />

            <ul className="list-unstyled jsjoe-sidebar--account__list">
              <li className="jsjoe-sidebar--account__list-item">
                <a
                  className="jsjoe-sidebar--account__list-link"
                  href="profile.html"
                >
                  <div className="jsjoe-sidebar--account__list-icon">
                    <FontAwesomeIcon icon={faSwimmer} />
                  </div>
                  Profile
                </a>
              </li>
              <li className="jsjoe-sidebar--account__list-item">
                <a
                  className="jsjoe-sidebar--account__list-link"
                  href="profile.html"
                >
                  <div className="jsjoe-sidebar--account__list-icon">
                    <FontAwesomeIcon icon={faGlasses} />
                  </div>
                  Settings
                </a>
              </li>
              <li className="jsjoe-sidebar--account__list-item">
                <Link
                  to="/"
                  className="jsjoe-sidebar--account__list-link"
                  onClick={this.props.user.logoutUser}
                >
                  <div className="jsjoe-sidebar--account__list-icon">
                    <FontAwesomeIcon icon={faBatteryQuarter} />
                  </div>
                  Sign Out
                  {this.props.isFetching ? (
                    <span className="fa fa-spinner fa-pulse fa-fw" />
                  ) : null}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
