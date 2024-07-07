const { userinfos, questions } = require("../model/index");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const jwt = require("jsonwebtoken");

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
  res.send("registered successfully");
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
  console.log(data);

  if (data) {
    const isValidatePw = bcrypt.compareSync(password, data.password);
    if (isValidatePw) {
      const token = jwt.sign({ id: data.id }, "codingIsFun", {
        expiresIn: "30d",
      });
      res.cookie("jsonToken", token);
      res.send("logged in successfully");
    } else {
      res.send("invalid credential");
    }
  } else {
    return res.send("invalid credential");
  }
};
