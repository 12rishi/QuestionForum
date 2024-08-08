const { QueryTypes } = require("sequelize");
const { answers, sequelize } = require("../model");

exports.storeAnswers = async (req, res) => {
  try {
    const { answer } = req.body;
    const { id: questionId } = req.params;
    const userId = req.userInfoId;
    const data = await answers.create({
      answerText: answer,
      questionId,
      userInfoId: userId,
    });
    await sequelize.query(
      `CREATE TABLE likes_${data.id} (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, userinfoId INT  NOT NULL REFERENCES userinfos(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`,
      {
        type: QueryTypes.CREATE,
      }
    );
    res.redirect(`/question/${questionId}`);
  } catch (error) {
    res.send(error);
  }
};
