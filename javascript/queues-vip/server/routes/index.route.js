const { errorDomain401 } = require('../utils/error/dbErrorHandler')
module.exports = (app, mongoose) => {
  app.use(async (req, res, next) => {
    try {
      const domains = await require('../models/domain.model').
        aggregate([{ '$match': {} }, { '$group': { _id: '$domain' } }])
      // console.log(req.rawBody);

      req.domains = domains.map(d => d._id)
      if (req.get("domain")) {
        req.mongo = mongoose.connection.useDb(req.get("domain"));
        // connect(req.mongo)
      }


      next();
    } catch (error) {
      next(error);
    }
  });

  const connect = (mongo) => {
    require('../models/service.model')(mongo)
    require('../models/client.model')(mongo)
    require('../models/employee.model')(mongo)
    require('../models/details.model')(mongo)
    require('../models/queue.model')(mongo)

  }
  app.use('/test', require('./test'))

  app.use("/admin", require("./business/index.admin-route"));


  app.use("/:domain", async (req, res, next) => {
    try {
      const domain = req.params.domain;



      errorDomain401(req.domains, domain)

      req.mongo = mongoose.connection.useDb(domain);
      // connect(req.mongo)

      next();
    } catch (error) {
      next(error);
    }
  });
  app.get("/:domain/check", (req, res) => {
    return res.status(200).json();
  });
  app.use("/:domain", require("./domain/index.domain-route"));

  require("../utils/error/index.error")(app);
};

const connect = (mongo) => {
  require('../models/service.model')(mongo)
  require('../models/client.model')(mongo)
  require('../models/employee.model')(mongo)
  require('../models/details.model')(mongo)
  require('../models/queue.model')(mongo)

}


