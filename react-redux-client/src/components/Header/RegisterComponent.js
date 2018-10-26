import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

class Register extends Component {
  render() {
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
            <Input
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
            <Input
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
            <Input
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
          <span className="small text-muted">Already have an account? </span>
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
            className="btn btn-block btn-sm jsjoe-btn-twitter--air transition-3d-hover mr-1 mt-0"
            href="#twitter"
          >
            Twitter
          </a>
          <a
            className="btn btn-block btn-sm jsjoe-btn-facebook--air transition-3d-hover mr-1 mt-0"
            href="#facebook"
          >
            Facebook
          </a>
          <a
            className="btn btn-block btn-sm jsjoe-btn-github--air transition-3d-hover mt-0"
            href="#github"
          >
            Github
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
