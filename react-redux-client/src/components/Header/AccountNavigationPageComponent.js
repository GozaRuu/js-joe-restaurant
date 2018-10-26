import React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Profile from "./ProfileComponent";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import ForgotPassword from "./ForgotPasswordComponent";

const createPage = ({ page, option }) => {
  switch (page) {
    case "login":
      return <Login handleLogin={option} />;
    case "register":
      return <Register handleRegister={option} />;
    case "forgot":
      return <ForgotPassword handleForgotPassword={option} />;
    case "profile":
      return <Profile user={option} />;
    default:
      return <React.Fragment />;
  }
};

const AccountNavigationPage = ({ page, option }) => (
  <aside className="jsjoe-sidebar">
    <div className="jsjoe-sidebar__container">
      <div className="jsjoe-header-sidebar__footer-offset">
        <div className="jsjoe-header-sidebar__content">
          <div className="d-flex align-items-center pt-4 px-7">
            <Link type="button" to="/" className="close ml-auto">
              <span aria-hidden="true">&times;</span>
            </Link>
          </div>
          {createPage({ page, option })}
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

export default AccountNavigationPage;
