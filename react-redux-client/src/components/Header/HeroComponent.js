import React from "react";

const Hero = () => {
  return (
    <React.Fragment>
      <div className="text-center mx-auto mt-4">
        <h1 className="display-3 font-size-48--md-down text-warning">
          Say hi to <span className="font-weight-bold text-danger">Js Joe</span>
        </h1>
        <p className="lead">
          The World's best cuisines fused create a unique experience.
        </p>
      </div>
    </React.Fragment>
  );
};

export default Hero;
