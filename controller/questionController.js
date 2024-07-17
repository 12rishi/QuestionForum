const { questions, userinfos, answers } = require("../model");
exports.renderQuestionPage = (req, res) => {
  res.render("./questions/askQuestion");
};

exports.askQuestion = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file.filename;
  const userInfoId = req.userInfoId;
  if (!title || !description) {
    res.send("please provide all the credentials");
  }
  await questions.create({
    title,
    description,
    image,
    userInfoId,
  });
  res.redirect("/");
};
exports.getAllQuestion = async (req, res) => {
  const data = await questions.findAll({
    include: [
      {
        model: userinfos,
      },
    ],
  });
};
exports.renderSingleQuestionPage = async (req, res) => {
  const { id } = req.params;
  const data = await questions.findAll({
    where: {
      id: id,
    },
    include: [
      {
        model: userinfos,
        attributes: ["userName"],
      },
    ],
  });
  const answerData = await answers.findAll({
    where: {
      questionId: id,
    },
    include: [
      {
        model: userinfos,
        attributes: ["userName"],
      },
    ],
  });
  res.render("./questions/singleQuestion.ejs", { data, answerData });
};
