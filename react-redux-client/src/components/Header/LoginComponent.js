import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(event) {
    switch (event.target.name) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        return;
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleLogin({
      email: this.state.email, //TODO: change username to email
      password: this.state.password
    });
  }
  render() {
    return (
      <React.Fragment>
        <header className="text-center mb-7">
          <h2 className="h4 mb-0">Welcome Back!</h2>
          <p>Login to manage your account.</p>
        </header>
        <Form>
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
                // type="email" //TODO: fix this serverside
                className="form-control jsjoe-form__input"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInput}
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
              <Input
                type="password"
                className="form-control jsjoe-form__input"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInput}
              />
            </div>
          </div>
          <div className="clearfix mb-4">
            <Link to="/forgot" className="float-right small jsjoe-link-muted">
              Forgot Password?
            </Link>
          </div>
          <div className="mb-2">
            <Button
              type="submit"
              className="btn btn-block btn-warning jsjoe-btn-warning transition-3d-hover"
              onClick={this.handleSubmit}
            >
              <Link to="/">Login</Link>
            </Button>
          </div>
        </Form>
        <div className="text-center mb-4">
          <span className="small text-muted">Do not have an account? </span>
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

export default Login;
