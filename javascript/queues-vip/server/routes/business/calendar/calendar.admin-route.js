const router = require("express").Router();
const queueController = require("../../../controller/queue/queue.controller");



router.post("/payment", queueController.payment);


module.exports = router;
