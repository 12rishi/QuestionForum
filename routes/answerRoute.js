const { storeAnswers } = require("../controller/answerController");
const { isAuthenticate } = require("../middleware/userAuthenticate");

const router = require("express").Router();
router.route("/:id").post(isAuthenticate, storeAnswers);
module.exports = router;
