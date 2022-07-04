require("dotenv").config();
require("colors");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const connectDB = require("./config/db");

const mainRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const storiesRouter = require("./routes/stories");

//initialize the app
const app = express();

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//passport config
require("./config/passport")(passport);

//show request using morgan in dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

//static folder
app.use(express.static(path.join(__dirname, "public")));

//session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    //store current user session in db
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/stories", storiesRouter);

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(
        `Server running in ${process.env.NODE_ENV} on port ${port}...`.cyan
          .underline
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
