const {
  handleregister,
  renderRegister,
  handleLogin,
  renderLogin,
  renderForgotpasswordPage,
  handleForgotPassword,
  renderOtpPage,
  handleOtpPage,
  renderChangePassword,
  handleChangePassword,
} = require("../controller/authController");

const router = require("express").Router();
router.route("/register").post(handleregister).get(renderRegister);
router.route("/login").post(handleLogin).get(renderLogin);
router
  .route("/forgotPassword")
  .get(renderForgotpasswordPage)
  .post(handleForgotPassword);
router.route("/verifyOtp").get(renderOtpPage);
router.route("/verifyOtp/:id").post(handleOtpPage);
router.route("/changePassword").get(renderChangePassword);
router.route("/changepassword/:email/:otp").post(handleChangePassword);
module.exports = router;
