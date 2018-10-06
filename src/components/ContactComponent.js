import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log(`Current State of The form is ${JSON.stringify(values)}`);
        alert(`Current State of The form is ${JSON.stringify(values)}`);
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                              4.5, Clear Water Bay Road<br />
                              Clear Water Bay, Sfax, Tunisia<br />
                              <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
                              <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:joe@jsjoe.net">
                                 joe@jsjoe.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="#skype"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:joe@jsjoe.net"><i className="fa fa-envelope"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text className="form-control" model=".firstname" id="firstname" name="firstname" placeholder="First Name" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                    <Errors className="text-danger" model=".firstname" show="touched" messages={{required: 'Required Field ', minLength: 'The length must be between 3 and 15 character ', maxLength: 'The length must be between 3 and 15 character '}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text className="form-control" model=".lastname" id="lastname" name="lastname" placeholder="Last Name" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                    <Errors className="text-danger" model=".lastname" show="touched" messages={{required: 'Required Field ', minLength: 'The length must be between 3 and 15 character ', maxLength: 'The length must be between 3 and 15 character '}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Tel. Number</Label>
                                <Col md={10}>
                                    <Control.text className="form-control" model=".telnum" id="telnum" name="telnum" placeholder="Tel. Number" validators={{required, minLength: minLength(6), maxLength: maxLength(15), isNumber}}/>
                                    <Errors className="text-danger" model=".telnum" show="touched" messages={{required: 'Required Field ', minLength: 'The length must be between 6 and 15 character ', maxLength: 'The length must be between 2 and 15 character ', isNumber: 'This field is a number '}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text className="form-control" model=".email" id="email" name="email" placeholder="Email" validators={{required, validEmail}}/>
                                    <Errors className="text-danger" model=".email" show="touched" messages={{required: 'Required Field', validEmail: 'Your email should be in this format: [your identifier]@[your provider].[an extenstion]'}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox className="form-check-input" model=".agree" name="agree" />
                                            <strong>May we contact you ?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select className="form-control" model=".contactType" name="contactType" >
                                        <option>Email</option>
                                        <option>Tel.</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Message</Label>
                                <Col md={10}>
                                    <Control.textarea className="form-control" model=".message" id="message" name="message" rows="8" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}


export default Contact;
