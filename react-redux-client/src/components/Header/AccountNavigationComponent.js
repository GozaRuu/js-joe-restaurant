import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AccountNavigationPage from "./AccountNavigationPageComponent";

class AccountNavigation extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/login"
          render={() => (
            <AccountNavigationPage
              page="login"
              handleSubmit={this.props.handleLogin}
            />
          )}
        />
        <Route
          path="/register"
          render={() => (
            <AccountNavigationPage
              page="register"
              handleSubmit={this.props.handleSubmit}
            />
          )}
        />
        <Route
          path="/forgot"
          render={() => (
            <AccountNavigationPage
              page="forgot"
              handleSubmit={this.props.handleForgot}
            />
          )}
        />
      </Switch>
    );
  }
}

export default AccountNavigation;
