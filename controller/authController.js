const { userinfos, questions } = require("../model/index");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendingEmail");

exports.renderHome = async (req, res) => {
  const data = await questions.findAll({
    include: [
      {
        model: userinfos,
        attributes: ["userName"],
      },
    ],
  });

  res.render("home", { data });
};
exports.renderAbout = (req, res) => {
  res.render("about");
};
exports.renderRegister = (req, res) => {
  res.render("./auth/register");
};
exports.renderLogin = (req, res) => {
  res.render("./auth/login");
};
exports.handleregister = async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.send("Oops!Something is missing");
  }
  await userinfos.create({
    userName: username,
    email,
    password: bcrypt.hashSync(password, 11),
  });
  res.redirect("/login");
};
exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("Oops! something is missing ");
  }
  const [data] = await userinfos.findAll({
    where: {
      email: email,
    },
  });

  if (data) {
    const isValidatePw = bcrypt.compareSync(password, data.password);
    if (isValidatePw) {
      const token = jwt.sign({ id: data.id }, "codingIsFun", {
        expiresIn: "30d",
      });
      res.cookie("jsonToken", token);
      res.redirect("/");
    } else {
      res.send("invalid credential");
    }
  } else {
    return res.send("invalid credential");
  }
};
exports.renderForgotpasswordPage = (req, res) => {
  res.render("./auth/forgotPassword");
};
exports.handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  const validateEmail = await userinfos.findAll({
    where: {
      email: email,
    },
  });
  if (validateEmail.lenth === 0)
    return res.send("Provided email is not registered");
  const OTP = Math.floor(1000 + Math.random() * 9000);

  const data = {
    email: email,
    subject: "Forgot Your Password?",
    text: `Your OTP is ${OTP}.Please,don't share this OTP with anyone.`,
  };
  await sendEmail(data);
  validateEmail[0].otp = OTP;
  validateEmail[0].otpGeneratedTime = Date.now();
  validateEmail[0].save();
  res.redirect("/verifyOtp?email=" + email);
};
exports.renderOtpPage = (req, res) => {
  const email = req.query.email;
  res.render("./auth/verifyOtp", { email: email });
};
exports.handleOtpPage = async (req, res) => {
  const { Otp } = req.body;
  const email = req.params.id;
  if (!Otp || !email) {
    return res.send("Enter Otp ");
  }
  const userData = await userinfos.findAll({
    where: {
      otp: Otp,
      email: email,
    },
  });
  if (userData.length === 0) {
    return res.send("Invalid OTP");
  } else {
    const currentTime = Date.now();
    const pastTime = userData[0].otpGeneratedTime;
    if (currentTime - pastTime <= 120000) {
      userData[0].otp = null;
      userData[0].otpGeneratedTime = null;
      await userData[0].save();
      res.redirect("/changePassword");
    } else {
      res.send("OTP was expired");
    }
  }
};
exports.renderChangePassword = (req, res) => {
  res.render("./auth/changePassword");
};
