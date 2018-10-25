import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Dishdetail from "./DishdetailComponent";
import {
  addComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback
} from "../redux/actionCreators";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    feedbackFormResponse: state.feedbackFormResponse
  };
};

const mapDispatchToProps = dispatch => ({
  addComment: (dish, rating, author, comment) =>
    dispatch(addComment(dish, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },
  postFeedback: data => {
    dispatch(postFeedback(data));
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  }
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomeComponentCreator = () => {
      const dish = this.props.dishes.dishes.filter(dish => dish.featured)[0];
      const promo = this.props.promotions.promotions.filter(
        promotion => promotion.featured
      )[0];
      const leader = this.props.leaders.leaders.filter(
        leader => leader.featured
      )[0];
      return (
        <Home
          dish={dish}
          dishLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promo={promo}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={leader}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const SelectedDishCreator = ({ match }) => {
      const dish = this.props.dishes.dishes.filter(
        dish => dish._id === match.params.dishId
      )[0];
      const comments = this.props.comments.comments.filter(
        comment => comment.dishId === match.params.dishId
      );
      return (
        <Dishdetail
          dish={dish}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={comments}
          commentsErrMess={this.props.comments.errMess}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <React.Fragment>
        <Header />
        {/* <Switch>
          <Route path="/home" component={HomeComponentCreator} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={SelectedDishCreator} />
          <Route
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Route
            path="/contactus"
            component={() => (
              <Contact
                resetFeedbackForm={this.props.resetFeedbackForm}
                postFeedback={this.props.postFeedback}
                feedbackFormResponse={this.props.feedbackFormResponse}
              />
            )}
          />
          <Redirect from="/" to="/home" />
        </Switch>
        <Footer /> */}
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
