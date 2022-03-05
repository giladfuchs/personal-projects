const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");
const { error401auth, error404 } = require("../utils/error/dbErrorHandler");

const Client = require("../models/client.model");

module.exports = (kind) => {
  return async (req, res, next) => {


    if (kind === "client" && !req.get("token")) {
      req.guest = true;
      return next();

    }

    try {


      const token = kind === "resetPassword" ? req.params.token : req.get("token");



      error401auth(token);
      const decodedToken = jwt.verify(token, "roeeangel");

      error404(decodedToken);
      switch (kind) {
        case "employee":
          req.employee = await Employee(req.mongo).findById(
            decodedToken.employeeId);

          error404(req.employee);
          break;
        case "client":

          req.client = await Client(req.mongo).findById(
            decodedToken.employeeId);

          error404(req.client);
          break;

        case "resetPassword":
          req.domain = decodedToken.domain.domain;
          const mongoose = require('mongoose')
          req.mongo = mongoose.connection.useDb(req.domain);
          req.employee = await Employee(req.mongo).findOne({
            'details.phone': decodedToken.phone,
          });
          error404(req.employee);
          break;

        default:
          const error = new Error("error in the path");
          error.statusCode = 404;
          return next(error);
      }
    } catch (err) {
      return next(err);
    }

    return next();
  };
};
