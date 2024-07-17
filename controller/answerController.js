const { answers } = require("../model");

exports.storeAnswers = async (req, res) => {
  try {
    const { answer } = req.body;
    const { id: questionId } = req.params;
    const userId = req.userInfoId;
    await answers.create({
      answerText: answer,
      questionId,
      userInfoId: userId,
    });
    res.redirect(`/question/${questionId}`);
  } catch (error) {
    res.send(error);
  }
};
