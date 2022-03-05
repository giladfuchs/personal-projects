import React from "react";

class Portfolio extends React.Component {
  state = {
    first: "https://imgur.com/8n5m6gk.gif",
    arr: [
      {
        img: "https://imgur.com/pRaHWqQ.gif",
        title: "queue system",
        content: `CRM system for businesses (e.g. salon/hairdresser) that allows them to manage their calendars.
        The website is a SPA that uses React and NodeJS API that runs on a cloud Docker container.
        Implemented as a SAAS model, that each business has access to its own database and domain.
        The website has an elegant UI that displays services, products, and calendars etc..
        Additionally, there are CRUD and complex operations with transactions for each object mo del.
        Every request contains a JWT token, that validates the user's permission.
        The password is encrypted with Bcrypt with the option to reset it.`,
        techonlogy: "  React(redux / hooks) TypeScript MongoDB REST NodeJS",
        github: "",
        link: "https://queues.vip/",
      },
      {
        img: "https://imgur.com/U9DU0sz.gif",
        title: "IOT CLASSIFICATION  ",
        content: `Record and analyze IoT network traffic ' (Amazon
          echo,camera,Lamp HUE,etc). Developed a classification
          method using Machine-Learning that can distinguish
          between IoT and non-IoT traffic. In addition it
          recognizes specific IoT components.`,
        techonlogy: "Python Machine-Learning WireShark",
        github: "https://github.com/giladfuchs/iot_classification",
      },
      {
        img: "https://imgur.com/qPKsUF2.gif",
        title: "Sushi-U",
        content: `A SPA for a sushi restaurant that uses React and NodeJS API that runs on a Docker container.
        The website has an elegant UI with sushi builder,and the ability to add sushi to the cart.
        An order process including payment, and the ability to view the customers’ previous orders.
        Every client is authorized with a JWT token, that is used in each request from the server.
        The password is encrypted with Bcrypt with the option to reset it.`,
        techonlogy: "  ReactJS MongoDB REST-API NodeJS",
        github: "https://github.com/giladfuchs/Shusi-U",
        link: "https://sushiu.firebaseapp.com/",
      },
      {
        img: "https://imgur.com/ocAC5Ty.gif",
        title: "Android application",
        content: `Cambio - Developed application that exchanges currencies between people P2P.
        Customer Characterization -developed real time application that calculates the customer’s
        distance from a store, the amount of people waiting in line and the average waiting time.`,
        techonlogy: " Android-Java Google- API / Auth  Json Firebase Xml",
        github: "https://github.com/giladfuchs/Cambio",
        link: "https://easyupload.io/thlqqj",
      },
      {
        img: "https://imgur.com/bO1mXAj.gif",
        title: "My Forum",
        content: `Forum web page that allows posting messages with
          photos, retrieving messages by author, topic or date
          range.`,
        techonlogy: "NodeJS MongoDB HTML Ejs.",
        github: "https://github.com/giladfuchs/MyForum",
        link: "https://my-forum-post.herokuapp.com",
      },

      {
        img: "https://imgur.com/eHf3Qkl.gif",
        title: "Java Toutrial",
        content: `.`,
        techonlogy: "Java Android  ",
        github: "https://github.com/giladfuchs/Customer-Characterization",
        link: "https://easyupload.io/80uq0a",
      },
    ],
    second: "https://i.imgur.com/y25rZbv.gif",
    third: "https://i.imgur.com/CoTwrzm.gif",
    four: "https://imgur.com/dUuolws.gif",
    five: "https://i.imgur.com/YMTxDoY.gif",
    six: "https://i.imgur.com/2372zkD.gif",
  };
  render() {
    console.log("poopppfofsda");

    return (
      <section id="work" className="portfolio-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">Portfolio</h3>

                <div className="line-mf"></div>
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.arr.map((prj) => (
              <div className="col-md-4">
                <div className="work-box">
                  <a href={prj.img} data-lightbox="gallery-aguadeluz">
                    <div className="work-img">
                      <img src={prj.img} alt="" className="img-fluid" />
                    </div>
                  </a>
                  <div className="work-content">
                    <div className="row">
                      <div className="col-sm-8">
                        <h2 className="w-title">{prj.title}</h2>
                        <div className="w-more">
                          <p
                            style={
                              prj.content.length > 300
                                ? prj.content.length > 500
                                  ? { fontSize: "0.71rem" }
                                  : { fontSize: "0.82rem" }
                                : null
                            }
                          >
                            <b>{prj.content}</b>
                          </p>

                          {/*/ <span className="w-date">18 Sep. 2018</span>*/}
                        </div>
                      </div>
                      <span className="another">{prj.techonlogy}</span>{" "}
                      <span
                        className="ico-circle-work"
                        style={prj.title.length > 15 ? { top: "57%" } : null}
                      >
                        {prj.github && (
                          <a
                            href={prj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              style={{ height: "35px", margin: "0 15px" }}
                              src="https://i.imgur.com/itN7AA6.png"
                            />
                          </a>
                        )}
                        {prj.link && (
                          <a
                            href={prj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              style={{
                                height: "32px",
                                backgroundColor: "#fff",
                              }}
                              src="https://img.icons8.com/office/16/000000/link.png"
                            />
                          </a>
                        )}
                      </span>
                    </div>
                  </div>

                  <a href={prj.img} style={{ display: "none" }}>
                    jsx-a11y/anchor-has-content warning
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
