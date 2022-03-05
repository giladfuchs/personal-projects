const router = require("express").Router();
const businessDetailsController = require("../../../controller/details/details.controller");

const isAuth = require("../../../middleware/is-auth");

const {
  businessDetailsValidator,
  // businessHoursValidator,
} = require("../../../validator/business/details.validator");


router.get("/", isAuth("employee"), businessDetailsController.getBuisnessDetails);

router.post(
  "/",
  // businessDetailsValidator,
  isAuth("employee"),
  businessDetailsController.postBuisnessDetails
);

router.post(
  "/hours",
  // businessHoursValidator,
  isAuth("employee"),
  businessDetailsController.postEmployeeHours
);

// router.post("/defualthours", businessDetailsController.postDefualtHours);


module.exports = router;
