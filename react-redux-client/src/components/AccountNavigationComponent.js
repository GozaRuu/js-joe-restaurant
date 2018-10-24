import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <React.Fragment>
      <header className="text-center mb-7">
        <h2 className="h4 mb-0">Welcome Back!</h2>
        <p>Login to manage your account.</p>
      </header>
      <div className="mb-4">
        <div className="input-group jsjoe-form">
          <div className="input-group-prepend jsjoe-form__prepend">
            <span className="input-group-text jsjoe-form__text">
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                className="jsjoe-form__text-inner"
              />
            </span>
          </div>
          <input
            type="email"
            className="form-control jsjoe-form__input"
            name="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="mb-2">
        <div className="input-group jsjoe-form">
          <div className="input-group-prepend jsjoe-form__prepend">
            <span className="input-group-text jsjoe-form__text">
              <FontAwesomeIcon
                icon={faLock}
                size="lg"
                className="jsjoe-form__text-inner"
              />
            </span>
          </div>
          <input
            type="password"
            className="form-control jsjoe-form__input"
            name="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="clearfix mb-4">
        <Link to="/forgot" className="float-right small jsjoe-link-muted">
          Forgot Password?
        </Link>
      </div>
      <div className="mb-2">
        <button
          type="submit"
          className="btn btn-block btn-warning jsjoe-btn-warning transition-3d-hover"
        >
          Login
        </button>
      </div>

      <div className="text-center mb-4">
        <span className="small text-muted">Do not have an account?</span>
        <Link className="small" to="/register">
          Signup
        </Link>
      </div>
      <div className="text-center">
        <span className="jsjoe-divider jsjoe-divider--xs jsjoe-divider--text mb-4">
          OR
        </span>
      </div>
      <div className="d-flex">
        <a
          className="btn btn-block btn-sm jsjoe-btn-facebook--air transition-3d-hover mr-1"
          href="#facebook"
        >
          <span className="fab fa-facebook-square mr-1" />
          Facebook
        </a>
        <a
          className="btn btn-block btn-sm jsjoe-btn-google--air transition-3d-hover ml-1 mt-0"
          href="#google"
        >
          <span className="fab fa-google mr-1" />
          Google
        </a>
      </div>
    </React.Fragment>
  );
};

const Register = () => {
  return (
    <React.Fragment>
      <header className="text-center mb-7">
        <h2 className="h4 mb-0">Welcome to Js-Joe!</h2>
        <p>Fill out the form to get started.</p>
      </header>

      <div className="mb-4">
        <div className="input-group jsjoe-form">
          <div className="input-group-prepend jsjoe-form__prepend">
            <span className="input-group-text jsjoe-form__text">
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                className="jsjoe-form__text-inner"
              />
            </span>
          </div>
          <input
            type="email"
            className="form-control jsjoe-form__input"
            name="email"
            placeholder="Email"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="input-group jsjoe-form">
          <div className="input-group-prepend jsjoe-form__prepend">
            <span className="input-group-text jsjoe-form__text">
              <FontAwesomeIcon
                icon={faLock}
                size="lg"
                className="jsjoe-form__text-inner"
              />
            </span>
          </div>
          <input
            type="password"
            className="form-control jsjoe-form__input"
            name="password"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="input-group jsjoe-form">
          <div className="input-group-prepend jsjoe-form__prepend">
            <span className="input-group-text jsjoe-form__text">
              <FontAwesomeIcon
                icon={faLock}
                size="lg"
                className="jsjoe-form__text-inner"
              />
            </span>
          </div>
          <input
            type="password"
            className="form-control jsjoe-form__input"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <div className="mb-2">
        <button
          type="submit"
          className="btn btn-block btn-warning jsjoe-btn-warning transition-3d-hover"
        >
          Get Started
        </button>
      </div>

      <div className="text-center mb-4">
        <span className="small text-muted">Already have an account?</span>
        <Link className="small" to="/login">
          Login
        </Link>
      </div>

      <div className="text-center">
        <span className="jsjoe-divider jsjoe-divider--xs jsjoe-divider--text mb-4">
          OR
        </span>
      </div>
      <div className="d-flex">
        <a
          className="btn btn-block btn-sm jsjoe-btn-facebook--air transition-3d-hover mr-1"
          href="#facebook"
        >
          <span className="fab fa-facebook-square mr-1" />
          Facebook
        </a>
        <a
          className="btn btn-block btn-sm jsjoe-btn-google--air transition-3d-hover ml-1 mt-0"
          href="#google"
        >
          <span className="fab fa-google mr-1" />
          Google
        </a>
      </div>
    </React.Fragment>
  );
};

const ForgotPassword = () => {
  return (
    <React.Fragment>
      <header className="text-center mb-7">
        <h2 className="h4 mb-0">Recover Password.</h2>
        <p>
          Enter your email address and an email with instructions will be sent
          to you.
        </p>
      </header>

      <div className="mb-4">
        <div className="input-group jsjoe-form">
          <div className="input-group-prepend jsjoe-form__prepend">
            <span className="input-group-text jsjoe-form__text">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </span>
          </div>
          <input
            type="email"
            className="form-control jsjoe-form__input"
            name="email"
            placeholder="Email"
          />
        </div>
      </div>

      <div className="mb-2">
        <button
          type="submit"
          className="btn btn-block btn-warning jsjoe-btn-warning transition-3d-hover"
        >
          Recover Password
        </button>
      </div>

      <div className="text-center mb-4">
        <span className="small text-muted">Remember your password?</span>
        <Link class="small" to="/login">
          Login
        </Link>
      </div>
    </React.Fragment>
  );
};

const AccountPage = ({ page }) => (
  <aside className="jsjoe-sidebar">
    <div className="jsjoe-sidebar__container">
      <div className="jsjoe-header-sidebar__footer-offset">
        <div className="jsjoe-header-sidebar__content">
          <div className="d-flex align-items-center pt-4 px-7">
            <Link type="button" to="/" class="close ml-auto">
              <span aria-hidden="true">&times;</span>
            </Link>
          </div>
          {page()}
        </div>
      </div>
      <div>
        <footer className="jsjoe-sidebar__footer jsjoe-sidebar__footer--account">
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
    </div>
  </aside>
);

class AccountNavigation extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" render={() => <AccountPage page={Login} />} />
        <Route
          path="/register"
          render={() => <AccountPage page={Register} />}
        />
        <Route
          path="/forgot"
          render={() => <AccountPage page={ForgotPassword} />}
        />
      </Switch>
    );
  }
}

export default AccountNavigation;
