import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <Navbar expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="60" width="82" alt="Js Joe Restaurant"/>
                        </NavbarBrand>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home" >
                                    <span className="fa fa-info fa-lg"> Home </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus" >
                                    <span className="fa fa-info fa-lg"> About Us </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu" >
                                    <span className="fa fa-list fa-lg"> Menu </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus" >
                                    <span className="fa fa-address-card fa-lg"> Contact </span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Js Joe Restaurant</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;
