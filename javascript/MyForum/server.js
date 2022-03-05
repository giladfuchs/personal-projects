if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const postRouter = require("./routes/posts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/posts", postRouter);

port = 3000;
DBname = "forum";

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGOLAB_AMBER_URI || `mongodb://localhost/${DBname}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(process.env.PORT || port, () =>
      console.log(`Running server on port ` + port)
    );
  });
