
const router = require("express").Router();

const authController = require("../../../controller/auth/client/auth.client-controller");



router.post("/login", authController.clientLogin);


router.post("/register", authController.clientRegister);
module.exports = router;
