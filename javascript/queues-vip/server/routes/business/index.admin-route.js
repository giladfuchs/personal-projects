const router = require("express").Router();

router.use("/auth", require("./auth/auth.employee-admin-route"));
router.use("/details", require("./details/details.admin-route"));
router.use("/service", require("./service/service.admin-route"));
router.use("/queue", require("./calendar/calendar.admin-route"));

router.use("/", require("./all-business/all-business.emplyee-route"));



module.exports = router;
