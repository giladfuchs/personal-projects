const {
  error422,
  error404,
  error403Admin, error401guest
} = require("../../utils/error/dbErrorHandler");



exports.getServices = async (req, res, next) => {
  try {
    //guset check
    const Business = require("../../models/details.model")(req.mongo);
    const buisnessDetails = await Business.findOne();
    error404(buisnessDetails);
    error401guest(req.guest, req.mongo)



    const Service = require("../../models/service.model");

    const services = await Service(req.mongo).find();
    error404(services);
    res.status(201).json({
      msg: "all the services",
      services,
    });
  } catch (error) {
    return next(error);
  }
};


exports.postService = async (req, res, next) => {
  try {
    error422(req);
    const Service = require("../../models/service.model")(req.mongo);

    error403Admin(req);


    const service = new Service({ ...req.body });
    await service.save();


    res.status(201).json({
      msg: "create new service",
      service: service,
    });
  } catch (err) {
    return next(err);
  }
};

exports.putService = async (req, res, next) => {
  try {
    error422(req);
    const Service = require("../../models/service.model")(req.mongo);

    error403Admin(req);

    console.log(req.body);

    const service = await Service.findOneAndUpdate({ _id: req.body._id }, { ...req.body });

    error404(service)
    res.status(205).send({
      message: "service update",
      service: service,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const serviceId = req.get("_id");


    const Service = require("../../models/service.model")(req.mongo);

    await error403Admin(req);

    await Service.findByIdAndDelete(serviceId);
    res.status(200).json({ message: "service deleted" });
  } catch (err) {
    return next(err);
  }
};
