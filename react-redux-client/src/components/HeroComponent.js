import React from "react";

const Hero = () => {
  return (
    <React.Fragment>
      <div className="w-md-80 w-lg-60 text-center mx-auto">
        <h1 className="display-4 font-size-48--md-down text-warning">
          Say hi to <span className="font-weight-bold">Js Joe</span>
        </h1>
        <p className="lead">
          The World's best cuisines fused create a unique experience.
        </p>
      </div>
    </React.Fragment>
  );
};

export default Hero;
