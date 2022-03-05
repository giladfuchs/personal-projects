import React from "react";
import "./stars.scss";
import Typed from "react-typed";

import Spinner from "./Spinner";
// this is the complete code, copy and use

class Intro extends React.Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    this.props.change();
  }
  change = () => {
    this.setState({ loading: false });
  };
  render() {
    return this.state.loading ? (
      <Spinner change={this.change.bind(this)} />
    ) : (
      <div id="home" className="intro route bg-image background">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        {/* <div className="overlay-intro"></div> */}
        <div className="intro-content display-table">
          <div className="table-cell">
            <div className="container">
              <h1 className="intro-title mb-4">Hello, I am Gilad Fuchs</h1>
              <p className="intro-subtitle">
                <span className="text-slider-items"></span>
                <strong className="text-slider">
                  <Typed
                    strings={[
                      "Front End Developer",
                      "Back End Developer",
                      "Software Engineer",
                    ]}
                    typeSpeed={80}
                    backDelay={1100}
                    backSpeed={30}
                    loop
                  />
                </strong>
              </p>
              <p className="pt-3">
                <a
                  className="btn btn-primary btn js-scroll px-4"
                  href="#about"
                  role="button"
                >
                  Know me better
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
