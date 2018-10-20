import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faListAlt,
  faMap,
  faLemon,
  faUserCircle,
  faFlag
} from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: true,
      isModalOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
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
        <Navbar light className="sticky-top" expand="md">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="assets/images/logo.png"
              height="38"
              alt="Js Joe Restaurant"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav className="mr-auto" style={{ marginLeft: 15 }} navbar>
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
                  <FontAwesomeIcon icon={faMap} /> About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/contactus">
                  <FontAwesomeIcon icon={faAddressCard} /> Contact Us
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem className="nav-link">
                <Button
                  outline
                  color="dark"
                  onClick={this.toggleModal}
                  className="btn btn-sm"
                >
                  <FontAwesomeIcon icon={faUserCircle} /> Login
                </Button>
              </NavItem>
              <NavItem className="nav-link">
                <Button
                  outline
                  color="secondary"
                  onClick={this.toggleModal}
                  className="btn btn-sm"
                >
                  <FontAwesomeIcon icon={faFlag} /> Register
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="display-4">Js Joe Restaurant</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">User Name</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="rememberme"
                    innerRef={input => (this.rememberme = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" className="bg-primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
