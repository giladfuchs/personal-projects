const router = require("express").Router();
const queueController = require("../../../controller/queue/queue.controller");
const isAuth = require("../../../middleware/is-auth");


router.post("/card", isAuth("client"), queueController.card);
router.post("/cash", isAuth("client"), queueController.cash);

router.post("/setServiceToQueue", isAuth("client"), queueController.setServiceToQueue);


module.exports = router;
