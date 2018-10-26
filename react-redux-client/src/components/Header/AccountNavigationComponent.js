import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Form, Input, Button } from "reactstrap";
import ReactSVG from "react-svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import ForgotPassword from "./ForgotPasswordComponent";

const createPage = ({ page, handleSubmit }) => {
  switch (page) {
    case "login":
      return <Login handleLogin={handleSubmit} />;
    case "register":
      return <Register handleLogin={handleSubmit} />;
    case "forgot":
      return <ForgotPassword handleLogin={handleSubmit} />;
    default:
      return <React.Fragment />;
  }
};

const AccountPage = ({ page, handleSubmit }) => (
  <aside className="jsjoe-sidebar">
    <div className="jsjoe-sidebar__container">
      <div className="jsjoe-header-sidebar__footer-offset">
        <div className="jsjoe-header-sidebar__content">
          <div className="d-flex align-items-center pt-4 px-7">
            <Link type="button" to="/" className="close ml-auto">
              <span aria-hidden="true">&times;</span>
            </Link>
          </div>
          {createPage({ page, handleSubmit })}
        </div>
      </div>
      <footer className="jsjoe-sidebar__footer jsjoe-sidebar__footer--account text-center">
        <ul className="list-inline mb-0">
          <li className="list-inline-item pr-3">
            <a
              className="jsjoe-sidebar__footer--account__text"
              href="privacy.html"
            >
              Privacy
            </a>
          </li>
          <li className="list-inline-item pr-3">
            <a
              className="jsjoe-sidebar__footer--account__text"
              href="terms.html"
            >
              Terms
            </a>
          </li>
          <li className="list-inline-item">
            <a
              className="jsjoe-sidebar__footer--account__text"
              href="help.html"
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </a>
          </li>
        </ul>

        <div className="position-absolute-bottom-0 account-footer-svg">
          <ReactSVG src="./assets/svg/AccountNavigationFooter.svg" />
        </div>
      </footer>
    </div>
  </aside>
);

class AccountNavigation extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/login"
          render={() => (
            <AccountPage page="login" handleSubmit={this.props.handleLogin} />
          )}
        />
        <Route
          path="/register"
          render={() => (
            <AccountPage
              page="register"
              handleSubmit={this.props.handleSubmit}
            />
          )}
        />
        <Route
          path="/forgot"
          render={() => (
            <AccountPage page="forgot" handleSubmit={this.props.handleForgot} />
          )}
        />
      </Switch>
    );
  }
}

export default AccountNavigation;
