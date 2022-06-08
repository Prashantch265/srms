const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const { corsOption } = require("./utils/cors");
const hpp = require("hpp");
const { logger } = require("./utils/logger");
const morgan = require("morgan");
const session = require("express-session");
const errorHandler = require("./middlewares/error.middleware");
const db = require("./lib/sequelize");
// const mongoose = require("./lib/mongo");
const { errorResponse } = require("./utils/");
const { errorMsg } = require("./utils/messages/message.json");
const path = require("path");
const stream = require("./utils/");
const passport = require("passport");
const httpContext = require("express-http-context");

// require("./lib/passport-jwt")(passport);

const app = new express();

const memoryStore = new session.MemoryStore();


if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "*", credentials: true })); //before routes
  app.use(morgan("dev", { "stream": stream.write }));
} else {
  app.use(morgan("combined", { "stream": stream.write }));
  app.use(cors(corsOption));
}

/**
 * for sequelize
 */
db.sequelize
  .authenticate()
  .then(() => logger.info("DB connected"))
  .catch((err) => logger.error(err.stack));

/**
 * for mongoose
 */
// mongoose.connection.on("error", (err) => {
//   logger.error(err.stack);
// });

app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(httpContext.middleware);
// app.use(authMiddleware);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// require("./routes/")(app);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" });
});


app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Not Found";
  next(err);
});

app.use((err, req, res, next) => {
  try {
    let errorObj;
    const { errorMsg } = require("./utils/messages/message.json");
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    if (err.status === 400) {
      errorObj = errorResponse(422, err?.message ? formattedMsg(err, errorMsg) : errorMsg['invalidBody'], err.source);
    } else if (err.status === 401) {
      errorObj = errorResponse(401, errorMsg['notAuthenticated'], null);
    } else if (err.status === 403) {
      errorObj = errorResponse(403, errorMsg['notAuthorized'], `[${req.method}] ${req.path}`);
    } else {
      logger.error(
        `[${req.method}] ${req.path} >> StatusCode : ${status}, Message : ${message} "\n" Stack : ${err.stack}`
      );
      errorObj = errorResponse(status, formattedMsg(err, errorMsg) || message, `[${req.method}] ${req.path}`);
    }
    return res.status(errorObj.status).json(errorObj);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
