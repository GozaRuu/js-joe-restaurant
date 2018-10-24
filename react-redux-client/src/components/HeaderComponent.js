import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
  Button
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faListAlt,
  faMap,
  faLemon,
  faUserCircle
} from "@fortawesome/free-regular-svg-icons";
import { Link, HashRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AccountNavigation from "./AccountNavigationComponent";
import ReactSVG from "react-svg";
import Hero from "./HeroComponent";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: true
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert(
      `UserName: ${this.username.value} Password: ${
        this.password.value
      } Remember: ${this.rememberme.checked}`
    );
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <div className="position-relative jsjoe-bg-light-blue-50 overflow-hidden">
          <div className="jsjoe-space-5-bottom">
            <Navbar light expand="md" className="z-index-2">
              <NavbarBrand className="mr-auto" href="/">
                <img
                  src="assets/images/logo.png"
                  height="38"
                  alt="Js Joe Restaurant"
                />
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleNav} />
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav className="ml-auto" style={{ marginLeft: 15 }} navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      <FontAwesomeIcon icon={faLemon} /> Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/menu">
                      <FontAwesomeIcon icon={faListAlt} /> Menu
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/aboutus">
                      <FontAwesomeIcon icon={faMap} /> About
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/contactus">
                      <FontAwesomeIcon icon={faAddressCard} /> Contact
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <NavItem className="nav-link">
                    <HashRouter>
                      <Link to="/login">
                        <Button
                          outline
                          color="dark"
                          className="btn btn-sm form-control"
                        >
                          <FontAwesomeIcon icon={faUserCircle} /> Login
                        </Button>
                      </Link>
                    </HashRouter>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            <Hero />
            <figure className="w-40 position-absolute-top-left-0 mx-auto">
              <ReactSVG src="./assets/svg/HeroTopLeft.svg" />
            </figure>
            <figure className="position-absolute-bottom-0">
              <ReactSVG src="./assets/svg/HeroBackground.svg" />
            </figure>
            <HashRouter>
              <AccountNavigation />
            </HashRouter>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
