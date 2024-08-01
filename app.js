const express = require("express");
const app = express();
const authRouter = require("./routes/authRoute");
const questionRouter = require("./routes/questionRoute");
const answerRouter = require("./routes/answerRoute");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const flash = require("connect-flash");
const session = require("express-session");
const { promisify } = require("util");

app.use(express.urlencoded({ extended: true }));
require("./model/index");
app.set("view engine", "ejs"); //automatically point to the views folder so we dont write views/home.ejs ,we simply write home or home.ejs
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
  })
);
const { renderHome, renderAbout } = require("./controller/authController");
app.use(async (req, res, next) => {
  try {
    const token = req.cookies.jsonToken;
    const decryptedresult = await promisify(jwt.verify)(token, "codingIsFun");
    if (decryptedresult) {
      res.locals.isAuthenticated = true;
    } else {
      res.locals.isAuthenticated = false;
    }
  } catch (error) {
    res.locals.isAuthenticated = false;
  }
  next();
});

app.get("/", renderHome);

app.get("/about", renderAbout);
app.use("/", authRouter);
app.use("/", questionRouter);
app.use("/answer", answerRouter);

app.use(express.static("public/css/"));
app.use(express.static("./storage/"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server has started at port no ${PORT} `);
});
