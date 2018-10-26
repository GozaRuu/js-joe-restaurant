import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

class ForgotPassword extends Component {
  render() {
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

        <div className="mb-2">
          <button
            type="submit"
            className="btn btn-block btn-warning jsjoe-btn-warning transition-3d-hover"
          >
            Recover Password
          </button>
        </div>

        <div className="text-center mb-4">
          <span className="small text-muted">Remember your password? </span>
          <Link class="small" to="/login">
            Login
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgotPassword;
