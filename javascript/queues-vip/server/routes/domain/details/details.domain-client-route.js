const router = require("express").Router();
const businessDetailsController = require("../../../controller/details/details.controller");
const isAuth = require("../../../middleware/is-auth");


router.get("/", isAuth("client"), businessDetailsController.getBuisnessDetails);




module.exports = router;
