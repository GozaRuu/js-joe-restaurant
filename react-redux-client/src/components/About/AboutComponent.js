import React from "react";
import { Card, CardBody, CardHeader, Media } from "reactstrap";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { Loading } from "../Common/LoadingComponent";
import { baseUrl } from "../../shared/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleRight,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";
import Frames from "./FramesComponent";

function About(props) {
  const RenderLeaders = props => {
    if (props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );
    }
    return (
      <Media list>
        {props.leaders.map(leader => {
          return (
            <Media style={{ marginTop: "32px" }}>
              <Media left style={{ marginRight: "60px" }}>
                <Media
                  object
                  src={baseUrl + leader.image}
                  alt={leader.name}
                  className="img-fluid jsjoe-avatar rounded-circle shadow"
                  style={{ width: "150px" }}
                />
              </Media>
              <Media body>
                <Media heading>{leader.designation}</Media>
                <p class="text-justify">{leader.description}</p>
              </Media>
            </Media>
          );
        })}
      </Media>
    );
  };

  return (
    <div className="position-relative">
      <div class="container jsjoe-space-1-top jsjoe-space-2-bottom">
        <div class="w-md-80 w-lg-50 text-center mx-auto mb-9 jsjoe-space-2-bottom">
          <span class="jsjoe-label jsjoe-label--sm jsjoe-label--warning mb-2">
            Where it all started
          </span>
          <h2 class="text-secondary">
            Our <span class="font-weight-bold text-dark">history</span>, story
            of passion
          </h2>
          <p>Our love of food got us very far</p>
        </div>
        <div className="row row-content">
          <div className="col-12 col-md-6">
            <p class="text-justify">
              Started in 2010, Js Joe quickly became a{" "}
              <span class="font-weight-bold text-dark">
                culinary icon of excellence
              </span>{" "}
              in Hong Kong. Unique brand that enjoys the loyalty of the A-list
              clientele in Hong Kong, and the pure skill of 4 of the best 5-star
              chefs of the country, you never know what will what coming for
              you.
            </p>
            <p class="text-justify">
              The restaurant traces its humble beginnings to The Frying Pan, a
              successful chain started by our{" "}
              <span class="font-weight-bold text-dark">CEO, Mr. Peter Pan</span>
              , that featured for the first time the world's best cuisines in a
              pan.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <figure class="w-80 mx-auto">
              <ReactSVG src="./assets/svg/AboutHistory.svg" />
            </figure>
          </div>
        </div>
      </div>

      <div class="container jsjoe-cubeportfolio jsjoe-space-1-top jsjoe-space-2-bottom">
        <div class="w-md-80 w-lg-50 text-center mx-auto mb-9">
          <span class="jsjoe-label jsjoe-label--sm jsjoe-label--warning mb-2">
            Excellence
          </span>
          <h2 class="text-secondary">
            Meet the <span class="font-weight-bold text-dark">Chefs</span>
          </h2>
          <p>Our love of food got us very far</p>
        </div>
        <div className="col-12">
          <RenderLeaders
            leaders={props.leaders.leaders}
            isLoading={props.leaders.isLoading}
            errMess={props.leaders.errMess}
          />
        </div>
      </div>
      <div class="container jsjoe-cubeportfolio jsjoe-space-1-top jsjoe-space-2-bottom">
        <div class="w-md-80 w-lg-50 text-center mx-auto mb-9">
          <span class="jsjoe-label jsjoe-label--sm jsjoe-label--warning mb-2">
            This is Us
          </span>
          <h2 class="text-secondary">
            Js Joe in <span class="font-weight-bold text-dark">frames</span>
          </h2>
          <p>We work very hard and we love it.</p>
        </div>

        <Frames />

        <div className="container jsjoe-space-1 position-relative z-index-2 jsjoe-space-2-top">
          <div className="row">
            <div className="ml-auto mb-lg-0">
              <div class="w-md-60 text-center mx-auto">
                <span class="jsjoe-label jsjoe-label--sm jsjoe-label--warning mb-2">
                  Motto
                </span>
                <h2 className="text-secondary font-weight-normal">
                  Our <span className="font-weight-bold text-dark">Leader</span>{" "}
                  says
                </h2>
                <figure className="mb-2" style={{ width: "50px" }}>
                  <ReactSVG src="./assets/svg/quote.svg" />
                </figure>
                <h3 className="mb-0">
                  You better cut the pizza in four pieces because I'm not hungry
                  enough to eat six.
                </h3>
                <div className="blockquote-footer">
                  Yogi Yogi Berra,
                  <cite title="Source Title">
                    The Wit and Wisdom of Yogi Berra, 2012
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container jsjoe-space-1-bottom">
        <div className="w-md-80 w-lg-50 text-center mx-auto mb-9">
          <span className="jsjoe-label jsjoe-label--sm jsjoe-label--warning mb-2">
            Ask Us
          </span>
          <h2 className="text-secondary font-weight-normal">
            Hit <span className="font-weight-bold text-dark">us</span> up
          </h2>
          <p>Reservations for parties and ceremonies</p>
        </div>

        <div className="row align-items-lg-center">
          <div className="col-lg-5 order-lg-2 mb-7 mb-lg-0">
            <div className="pl-lg-7">
              <div className="mb-4">
                <p>
                  We give all our skill to make sure your best moments are
                  executed in perfection
                </p>
              </div>

              <Link
                className="media align-items-center shadow p-4"
                to="/contactus"
                style={{ textDecoration: "none" }}
              >
                <span className="media-body">
                  <span className="d-flex justify-content-between align-items-center font-weight-bold">
                    <span>
                      <FontAwesomeIcon icon={faAddressCard} /> Get Started with
                      Front
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <figure className="col-lg-7 order-lg-1 mb-7 mb-lg-0">
            <ReactSVG src="./assets/svg/AboutTalkToUs.svg" />
          </figure>
        </div>
      </div>
      {/* <figure className="position-absolute-top-right-0 w-75 w-md-60 w-lg-35">
      </figure> */}
    </div>
  );
}

export default About;
