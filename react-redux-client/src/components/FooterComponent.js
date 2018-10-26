import React from "react";
import ReactSVG from "react-svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

const Footer = props => {
  return (
    <footer className="position-relative jsjoe-bg-light-blue-50">
      <div className="container jsjoe-space-4-top jsjoe-space-0-5-bottom">
        {/* <div className="col-md-8 col-lg-6 mb-4 mb-md-0"> */}
        <div className="row jsjoe-space-1-bottom">
          <div className="col-md-4 mb-7 mb-md-0">
            <div className="media">
              <div className="d-flex mr-3">
                <span className="jsjoe-icon jsjoe-icon--lg jsjoe-icon-secondary--air rounded-circle">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="jsjoe-icon__inner"
                  />
                </span>
              </div>
              <div className="media-body">
                <h4 className="jsjoe-list__link font-weight-normal mb-0">
                  Call us
                </h4>
                <h4 className="jsjoe-list__content font-weight-normal mb-0">
                  <span className="d-block">+216 (062) 109-9222</span>
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-7 mb-md-0">
            <div className="media">
              <div className="d-flex mr-3">
                <span className="jsjoe-icon jsjoe-icon--lg jsjoe-icon-secondary--air rounded-circle">
                  <span className="fa fa-envelope jsjoe-icon__inner" />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="jsjoe-icon__inner"
                  />
                </span>
              </div>
              <div className="media-body">
                <h4 className="jsjoe-list__link font-weight-normal mb-0">
                  Email us
                </h4>
                <h4 className="jsjoe-list__content font-weight-normal mb-0">
                  <span className="d-block">support@jsjoe.com</span>
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-7 mb-md-0">
            <div className="media">
              <div className="d-flex mr-3">
                <span className="jsjoe-icon jsjoe-icon--lg jsjoe-icon-secondary--air rounded-circle">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="jsjoe-icon__inner"
                  />
                </span>
              </div>
              <div className="media-body">
                <h4 className="jsjoe-list__link font-weight-normal mb-0">
                  Address
                </h4>
                <h4 className="jsjoe-list__content font-weight-normal mb-0">
                  <span className="d-block">153 Shohadaa Plaza, Sfax</span>
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ul className="list-inline text-lg-center jsjoe-list jsjoe-list--light">
            <li className="list-inline-item jsjoe-list__item pl-0">
              <a className="jsjoe-list__link" href="footer.html">
                About
              </a>
            </li>
            <li className="list-inline-item jsjoe-list__item">
              <a className="jsjoe-list__link" href="footer.html">
                Services
              </a>
            </li>
            <li className="list-inline-item jsjoe-list__item">
              <a className="jsjoe-list__link" href="footer.html">
                Careers
              </a>
            </li>
            <li className="list-inline-item jsjoe-list__item">
              <a className="jsjoe-list__link" href="footer.html">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <hr className="opacity-0_8 my-7" />
        {/* <div className="row align-items-lg-center"> */}
        <div className="text-center">
          <div>
            <a
              class="d-inline-block mb-2 mt-1"
              href="social.html"
              aria-label="Front"
            >
              {/*TODO: make logo svg */}
              <img
                src="assets/images/logo.png"
                height="16"
                alt="Js Joe Restaurant"
              />
            </a>
          </div>
          {/* <div className="col-md-4 col-lg-3"> */}
          <div>
            {/* <ul className="list-inline text-md-right mb-0"> */}
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <li className="list-inline-item">
                  <a
                    className="jsjoe-bg-transparent jsjoe-icon jsjoe-icon-secondary--air rounded"
                    href="social.html"
                  >
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="jsjoe-icon__inner"
                    />
                  </a>
                </li>
                <a
                  className="jsjoe-bg-transparent jsjoe-icon jsjoe-icon-secondary--air rounded"
                  href="social.html"
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="jsjoe-icon__inner"
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="jsjoe-bg-transparent jsjoe-icon jsjoe-icon-secondary--air rounded"
                  href="social.html"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="jsjoe-icon__inner"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="col-lg-3 mb-4 mb-lg-0"> */}
          <div>
            <p className="small jsjoe-text-light mb-0">
              © Js Joe. 2018 Kais Sghari. All rights reserved.
            </p>
          </div>
        </div>
        {/* TODO: add svg to match header */}
        <figure className="position-absolute-top-0">
          <ReactSVG src="./assets/svg/Footer.svg" />
        </figure>
      </div>
    </footer>
  );
};

export default Footer;
