const {
  renderQuestionPage,
  askQuestion,
  renderSingleQuestionPage,
} = require("../controller/questionController");
const { multer, storage } = require("../middleware/multerConfig");
const { isAuthenticate } = require("../middleware/userAuthenticate");
const upload = multer({ storage: storage });

const router = require("express").Router();
router
  .route("/askquestion")
  .get(isAuthenticate, renderQuestionPage)
  .post(isAuthenticate, upload.single("image"), askQuestion);
router.route("/question/:id").get(isAuthenticate, renderSingleQuestionPage);
module.exports = router;
