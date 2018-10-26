import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AccountNavigationPage from "./AccountNavigationPageComponent";

class AccountNavigation extends Component {
  render() {
    return !this.props.auth.auth.isAuthenticated ? (
      <Switch>
        <Route
          path="/login"
          render={() => (
            <AccountNavigationPage
              page="login"
              option={this.props.handleLogin}
            />
          )}
        />
        <Route
          path="/register"
          render={() => (
            <AccountNavigationPage
              page="register"
              option={this.props.handleSubmit}
            />
          )}
        />
        <Route
          path="/forgot"
          render={() => (
            <AccountNavigationPage
              page="forgot"
              option={this.props.handleForgot}
            />
          )}
        />
      </Switch>
    ) : (
      <Switch>
        <Route
          path="/profile"
          render={() => (
            <AccountNavigationPage
              page="profile"
              option={{
                user: this.props.auth.auth.user,
                logoutUser: this.props.auth.logoutUser
              }}
            />
          )}
        />
      </Switch>
    );
  }
}

export default AccountNavigation;
