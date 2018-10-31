import React from "react";
import { Card, CardBody, CardHeader, Media } from "reactstrap";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { Loading } from "../Common/LoadingComponent";
import { baseUrl } from "../../shared/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
                <Media object src={baseUrl + leader.image} alt={leader.name} />
              </Media>
              <Media body>
                <Media heading>{leader.designation}</Media>
                {leader.description}
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
      <div class="container jsjoe-space-1-top jsjoe-space-2-bottom">
        <div class="w-md-80 w-lg-50 text-center mx-auto mb-9">
          <span class="jsjoe-label jsjoe-label--sm jsjoe-label--warning mb-2">
            Quickly
          </span>
          <h2 class="text-secondary">
            Js Joe at <span class="font-weight-bold text-dark">a glance</span>
          </h2>
          <p>We work very hard and we love it.</p>
        </div>
        <div className="row row-content">
          <div className="mx-auto">
            <Card>
              <CardHeader className="bg-warning text-white">
                Facts At a Glance
              </CardHeader>
              <CardBody>
                <dl className="row p-1">
                  <dt className="col-6">Started</dt>
                  <dd className="col-6">3 Feb. 2013</dd>
                  <dt className="col-6">Major Stake Holder</dt>
                  <dd className="col-6">HK Fine Foods Inc.</dd>
                  <dt className="col-6">Last Year's Turnover</dt>
                  <dd className="col-6">$1,250,375</dd>
                  <dt className="col-6">Employees</dt>
                  <dd className="col-6">40</dd>
                </dl>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      {/* <div className="row row-content">
        <div className="col-12">
          <h2>Corporate Leadership</h2>
        </div>
        <div className="col-12">
          <RenderLeaders
            leaders={props.leaders.leaders}
            isLoading={props.leaders.isLoading}
            errMess={props.leaders.errMess}
          />
        </div>
      </div> */}
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

        <div className="container">
          <div className="row">
            <div className="col-md-3" style={{ paddingLeft: "0" }}>
              <div>
                <a
                  className="jsjoe-media-viewer"
                  href="../../assets/images/1920x1920/img1.jpg"
                  data-title="Front in frames - image #01"
                >
                  <img
                    className="img-fluid rounded"
                    src="../../assets/images/500x805/img1.jpg"
                    alt="Image Description"
                  />
                  <span className="jsjoe-media-viewer__container">
                    <span className="jsjoe-media-viewer__icon">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="jsjoe-media-viewer__icon-inner"
                      />
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="col-md-3" style={{ paddingLeft: "0" }}>
              <div style={{ paddingBottom: "16px" }}>
                <a
                  className="jsjoe-media-viewer"
                  href="../../assets/images/1920x1080/img27.jpg"
                  data-title="Front in frames - image #02"
                >
                  <img
                    className="img-fluid rounded"
                    src="../../assets/images/380x227/img1.jpg"
                    alt="Image Description"
                  />
                  <span className="jsjoe-media-viewer__container">
                    <span className="jsjoe-media-viewer__icon">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="jsjoe-media-viewer__icon-inner"
                      />
                    </span>
                  </span>
                </a>
              </div>

              <div>
                <a
                  className="jsjoe-media-viewer"
                  href="../../assets/images/1920x1080/img21.jpg"
                  data-title="Front in frames - image #06"
                >
                  <img
                    className="img-fluid rounded"
                    src="../../assets/images/380x360/img22.jpg"
                    alt="Image Description"
                  />
                  <span className="jsjoe-media-viewer__container">
                    <span className="jsjoe-media-viewer__icon">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="jsjoe-media-viewer__icon-inner"
                      />
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="col-md-3" style={{ paddingLeft: "0" }}>
              <div style={{ paddingBottom: "16px" }}>
                <a
                  className="jsjoe-media-viewer"
                  href="../../assets/images/1920x1920/img16.jpg"
                  data-title="Front in frames - image #03"
                >
                  <img
                    className="img-fluid rounded"
                    src="../../assets/images/380x360/img23.jpg"
                    alt="Image Description"
                  />
                  <span className="jsjoe-media-viewer__container">
                    <span className="jsjoe-media-viewer__icon">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="jsjoe-media-viewer__icon-inner"
                      />
                    </span>
                  </span>
                </a>
              </div>

              <div>
                <a
                  className="jsjoe-media-viewer"
                  href="../../assets/images/1920x1980/img26.jpg"
                  data-title="Front in frames - image #03"
                >
                  <img
                    className="img-fluid rounded"
                    src="../../assets/images/380x227/img3.jpg"
                    alt="Image Description"
                  />
                  <span className="jsjoe-media-viewer__container">
                    <span className="jsjoe-media-viewer__icon">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="jsjoe-media-viewer__icon-inner"
                      />
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="col-md-3" style={{ paddingLeft: "0" }}>
              <div style={{ paddingBottom: "16px" }}>
                <a
                  className="jsjoe-media-viewer"
                  href="../../assets/images/1920x1080/img4.jpg"
                  data-title="Front in frames - image #04"
                >
                  <img
                    className="img-fluid rounded"
                    src="../../assets/images/380x227/img2.jpg"
                    alt="Image Description"
                  />
                  <span className="jsjoe-media-viewer__container">
                    <span className="jsjoe-media-viewer__icon">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="jsjoe-media-viewer__icon-inner"
                      />
                    </span>
                  </span>
                </a>
              </div>
              <div>
                <a
                  className="jsjoe-media-viewer"
                  href="../../assets/images/1920x1080/img25.jpg"
                  data-title="Front in frames - image #05"
                >
                  <img
                    className="img-fluid rounded"
                    src="../../assets/images/380x360/img24.jpg"
                    alt="Image Description"
                  />
                  <span className="jsjoe-media-viewer__container">
                    <span className="jsjoe-media-viewer__icon">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="jsjoe-media-viewer__icon-inner"
                      />
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container jsjoe-space-1 position-relative z-index-2 jsjoe-space-2-top">
          <div className="row">
            <div className="ml-auto mb-7 mb-lg-0">
              <div class="w-md-60 text-center mx-auto">
                <span class="jsjoe-label jsjoe-label--sm jsjoe-label--warning mb-2">
                  Our Leader says
                </span>
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
      {/* <figure className="position-absolute-top-right-0 w-75 w-md-60 w-lg-35">
      </figure> */}
    </div>
  );
}

export default About;
