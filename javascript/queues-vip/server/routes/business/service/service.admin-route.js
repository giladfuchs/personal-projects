const router = require("express").Router();
const serviceController = require("../../../controller/service/service.controller");
const isAuth = require("../../../middleware/is-auth");

const {
  serviceValidator,
} = require("../../../validator/business/service.validator");

router.get("/", isAuth("employee"), serviceController.getServices);

router.post(
  "/",
  serviceValidator,
  isAuth("employee"),
  serviceController.postService
);

router.put(
  "/",
  serviceValidator,
  isAuth("employee"),
  serviceController.putService
);

router.delete("/", isAuth("employee"), serviceController.deleteService);
module.exports = router;
