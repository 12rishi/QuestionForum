const {
  renderQuestionPage,
  askQuestion,
} = require("../controller/questionController");
const { multer, storage } = require("../middleware/multerConfig");
const { isAuthenticate } = require("../middleware/userAuthenticate");
const upload = multer({ storage: storage });

const router = require("express").Router();
router
  .route("/askquestion")
  .get(isAuthenticate, renderQuestionPage)
  .post(isAuthenticate, upload.single("image"), askQuestion);
module.exports = router;
