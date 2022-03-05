import React from "react";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: [
        {
          id: "HTML5_skill",
          content: "Hebrew",
          porcentage: "100%",
          value: "80",
        },
        {
          id: "CSS3_skill",
          content: "English",
          porcentage: "93%",
          value: "75",
        },
        {
          id: "JavaScript_skill",
          content: "Spainsh",
          porcentage: "85%",
          value: "90",
        },
      ],
      about_me: [
        {
          id: "first-p-about",
          content: `Software Engineer who loves to transform ideas into reality using code.
             I am passionate about development and would like to learn about new technologies.`,
        },
        {
          id: "second-p-about",
          content:
            " I believe that to be successful in life, one needs to be obsessive with their dreams and keep working towards them.",
        },
        {
          id: "third-p-about",
          content: "",
        },
      ],
    };
  }

  render() {
    return (
      <section id="about" className="about-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="box-shadow-full">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div
                        className="col-sm-6 col-md-5"
                        style={{ margin: "0 auto" }}
                      >
                        <div
                          className="about-img"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src="https://i.imgur.com/RSMPkqn.jpg"
                            className="img-fluid rounded b-shadow-a"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <h2>Skills</h2>
                    <p>
                      <b>Server side: </b>
                      Java, NodeJs, Python.
                      <br></br>
                      <b>Client side: </b>
                      Android, Javascript, React.
                      <br></br>
                      <b>DataBase: </b>
                      MySQL, MongoDB, FireBase
                    </p>
                    <hr></hr>
                  </div>
                  <div className="col-md-6">
                    <div className="about-me pt-4 pt-md-0">
                      <div className="title-box-2">
                        <h5 className="title-left">About Me</h5>
                      </div>
                      {this.state.about_me.map((content) => {
                        return (
                          <p className="lead" key={content.id}>
                            {content.content}
                          </p>
                        );
                      })}
                      <div className="about-button">
                        <a
                          className="btn btn-primary btn js-scroll px-4"
                          href="#work"
                        >
                          Check Out My Latest Projects.
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
