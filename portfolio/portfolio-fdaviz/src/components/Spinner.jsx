import React from "react";

const spinner = (props) => {
  props.change();

  return <div className="loader">Loading...</div>;
};
export default spinner;
