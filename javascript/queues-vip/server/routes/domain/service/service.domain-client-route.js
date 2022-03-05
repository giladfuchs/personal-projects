const router = require("express").Router();
const serviceController = require("../../../controller/service/service.controller");
const isAuth = require("../../../middleware/is-auth");

router.get("/", isAuth("client"), serviceController.getServices);

module.exports = router;
