import React, { Component } from "react";
import ContactForm from "./ContactFormComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faFax
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="container">
      <div className="clearfix jsjoe-space-2">
        <div className="row">
          <div className="col-sm-6 col-lg-3 jsjoe-ver-divider jsjoe-ver-divider--none-lg">
            <div className="text-center py-5">
              <span className="jsjoe-icon jsjoe-icon-warning--air jsjoe-icon--lg rounded-circle mb-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="jsjoe-icon__inner"
                />
              </span>
              <h2 className="h6 mb-0">Address</h2>
              <p className="mb-0">153 Shohadaa Plaza, Sfax</p>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 jsjoe-ver-divider jsjoe-ver-divider--none-lg">
            <div className="text-center py-5">
              <span className="jsjoe-icon jsjoe-icon-warning--air jsjoe-icon--lg rounded-circle mb-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="jsjoe-icon__inner"
                />
              </span>
              <h3 className="h6 mb-0">Email</h3>
              <p className="mb-0">support@jsjoe.com</p>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 jsjoe-ver-divider jsjoe-ver-divider--none-lg">
            <div className="text-center py-5">
              <span className="jsjoe-icon jsjoe-icon-warning--air jsjoe-icon--lg rounded-circle mb-4">
                <FontAwesomeIcon icon={faPhone} className="jsjoe-icon__inner" />
              </span>
              <h3 className="h6 mb-0">Phone Number</h3>
              <p className="mb-0">+216 (062) 109-9222</p>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="text-center py-5">
              <span className="jsjoe-icon jsjoe-icon-warning--air jsjoe-icon--lg rounded-circle mb-4">
                <FontAwesomeIcon icon={faFax} className="jsjoe-icon__inner" />
              </span>
              <h3 className="h6 mb-0">Fax</h3>
              <p className="mb-0">+1 (062) 109-9223</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-0" />

      <div className="container jsjoe-space-3">
        <div className="w-md-80 w-lg-50 text-center mx-auto mb-9">
          <span className="jsjoe-label jsjoe-label--sm jsjoe-label--warning mb-2">
            Leave a Message
          </span>
          <h2 className="text-secondary font-weight-normal">
            Tell us about{" "}
            <span className="font-weight-bold text-dark">yourself</span>
          </h2>
          <p>
            Whether you have questions or you would just like to say hello,
            contact us.
          </p>
        </div>

        <div className="w-lg-80 mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
