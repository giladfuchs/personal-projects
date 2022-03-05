import React, { Component } from "react";
//import components

import Navbar from "./components/navbar.jsx";
import Intro from "./components/intro.jsx";
import fetch from "node-fetch";
import axios from "./axios";
import asyncComponent from "./asyncComponent";

const AsyncAll = asyncComponent(() => {
  return import("./All");
});
class App extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    // this.demoAsyncCall().then(() => this.setState({ loading: false }));
    document.getElementById("load").remove();
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        // this.setState({ loading: false });
        let ip = data.ip.toString().split(".").join("_");
        axios.post(
          "/count/" + new Date().toString().split(":")[0] + "/" + ip + ".json",
          {
            date: new Date().toString().split(":")[0],
            ip: data.ip,
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // demoAsyncCall = () => {
  //   return new Promise((resolve) => setTimeout(() => resolve(), 100));
  // };

  change = () => {
    console.log("uplooddd");
    setTimeout(() => {}, 1001);
    this.setState({ loading: false });
  };

  render() {
    let ans = this.state.loading ? (
      <React.Fragment>
        <Navbar />
        <Intro change={this.change.bind(this)} />
      </React.Fragment>
    ) : (
      <AsyncAll />
    );

    return ans;
  }
}

export default App;
