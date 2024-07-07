const {
  handleregister,
  renderRegister,
  handleLogin,
  renderLogin,
} = require("../controller/authController");

const router = require("express").Router();
router.route("/register").post(handleregister).get(renderRegister);
router.route("/login").post(handleLogin).get(renderLogin);
module.exports = router;
