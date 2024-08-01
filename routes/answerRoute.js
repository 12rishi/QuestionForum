const { storeAnswers } = require("../controller/answerController");
const { isAuthenticate } = require("../middleware/userAuthenticate");
const catchError = require("../utils/catchError");

const router = require("express").Router();
router.route("/:id").post(isAuthenticate, catchError(storeAnswers));
module.exports = router;
