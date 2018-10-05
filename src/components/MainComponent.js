import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent'
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {
        const HomeComponentCreator = () => {
            const dish = this.state.dishes.filter((dish) => dish.featured)[0];
            const promotion = this.state.promotions.filter((promotion) => promotion.featured)[0];
            const leader = this.state.leaders.filter((leader) => leader.featured)[0];
            return (
                <Home dish={dish} promotion={promotion} leader={leader} />
            );
        };

        const SelectedDishCreator = ({match}) => {
            const dish = this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0];
            const comments = this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10));
            return (
                <Dishdetail dish={dish} comments={comments}/>
            );
        };

        const AboutCreator = () => {
            const leaders = this.state.leaders;
            return (
                <About leaders={this.state.leaders}/>
            );
        };

        return (
            <div>
                <Header />
                    <Switch>
                        <Route path="/home" component={HomeComponentCreator} />
                        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                        <Route path="/menu/:dishId" component={SelectedDishCreator} />
                        <Route path="/aboutus" component={AboutCreator} />
                        <Route path="/contactus" component={Contact} />
                        <Redirect to="/home" />
                    </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
