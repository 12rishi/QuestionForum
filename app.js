const express = require("express");
const app = express();
const authRouter = require("./routes/authRoute");
const questionRouter = require("./routes/questionRoute");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
require("./model/index");
app.set("view engine", "ejs"); //automatically point to the views folder so we dont write views/home.ejs ,we simply write home or home.ejs
app.use(cookieParser());

const { renderHome, renderAbout } = require("./controller/authController");

app.get("/", renderHome);

app.get("/about", renderAbout);
app.use("/", authRouter);
app.use("/", questionRouter);

app.use(express.static("public/css/"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server has started at port no ${PORT} `);
});
