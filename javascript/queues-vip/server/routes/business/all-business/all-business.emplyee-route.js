const router = require("express").Router();
const moment = require('moment')

const isAuth = require("../../../middleware/is-auth")
const Business = require("../../../models/details.model");
const Service = require("../../../models/service.model");
const Queue = require("../../../models/queue.model");
const { matrix, parseJsonMongo } = require('../../../controller/queue/queue.helper.controller')



router.get("/", isAuth("employee"), async (req, res, next) => {
  try {

    const business = await Business(req.mongo).findOne();
    const services = await Service(req.mongo).find();
    const queues = await Queue(req.mongo).find()
      .populate("clientId").populate("serviceId").exec();
    const ans = await matrix(next, parseJsonMongo(req.employee.schedule), req.mongo, services, req.employee.otherData.timeDistance);

    const mat = ans.mat;
    const days = ans.days

    res.status(201).json({
      msg: "all the business",
      services,
      business,
      employee: req.employee,
      queues,
      mat,
      days

    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
