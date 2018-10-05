import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
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
        return (
            <div>
                <Header />
                    <Switch>
                        <Route path="/home" component={HomeComponentCreator} />
                        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                        <Route exact path="/contactus" component={Contact} />
                        <Redirect to="/home" />
                    </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
