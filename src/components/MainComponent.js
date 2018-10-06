import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent'
import { addComment } from '../redux/actionCreators'

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dish, rating, author, comment) => dispatch(addComment(dish, rating, author, comment))
});

class Main extends Component {

    render() {
        const HomeComponentCreator = () => {
            const dish = this.props.dishes.filter((dish) => dish.featured)[0];
            const promotion = this.props.promotions.filter((promotion) => promotion.featured)[0];
            const leader = this.props.leaders.filter((leader) => leader.featured)[0];
            return (
                <Home dish={dish} promotion={promotion} leader={leader} />
            );
        };

        const SelectedDishCreator = ({match}) => {
            const dish = this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0];
            const comments = this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10));
            return (
                <Dishdetail dish={dish} comments={comments} addComment={this.props.addComment}/>
            );
        };

        return (
            <div>
                <Header />
                    <Switch>
                        <Route path="/home" component={HomeComponentCreator} />
                        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                        <Route path="/menu/:dishId" component={SelectedDishCreator} />
                        <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
                        <Route path="/contactus" component={Contact} />
                        <Redirect to="/home" />
                    </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
