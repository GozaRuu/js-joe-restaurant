import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Frames = () => (
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
);

export default Frames;
