const router = require("express").Router();
const resetPasswordController = require("../../../controller/auth/admin/reset-password.employee-controller");

const authController = require("../../../controller/auth/admin/auth.employee-controller");
const isAuth = require("../../../middleware/is-auth");


const { employeeValidator, passwordIsEqualValidator, firstEmployeeValidator } = require('../../../validator/business/employee.validator');

router.post("/login", authController.employeeLogin);

router.get("/check", authController.check);

router.post("/first-register", firstEmployeeValidator, authController.firstRegister);

router.post("/approve-first-register", authController.approveFirstRegister);



router.post("/register", employeeValidator, authController.register);

// router.get("/mail", resetPasswordController.mail);

router.post("/sendResetMessage", resetPasswordController.employeeSmsResetPassword);

router.post(
  "/resetPassword/:token",
  passwordIsEqualValidator,
  isAuth("resetPassword"),
  resetPasswordController.employeeResetPassword
);

module.exports = router;


