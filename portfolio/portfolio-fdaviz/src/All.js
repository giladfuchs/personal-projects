import React from "react";
import Navbar from "./components/navbar.jsx";
import Intro from "./components/intro.jsx";
import About from "./components/about.jsx";
import Portfolio from "./components/portfolio.jsx";
import Contact from "./components/contact.jsx";
import BackToTop from "./components/back-top.jsx";

const all = () => (
  <React.Fragment>
    <Navbar />
    <Intro change={() => {}} />
    <About />
    <Portfolio />
    <Contact />
    <BackToTop />
  </React.Fragment>
);

export default all;
