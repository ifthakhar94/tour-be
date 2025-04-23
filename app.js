const express = require("express");
const morgan = require("morgan");
// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimit = require("express-rate-limit");
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require("helmet");
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoSanitize = require("express-mongo-sanitize");
// eslint-disable-next-line import/no-extraneous-dependencies
const xss = require("xss-clean");
// eslint-disable-next-line import/no-extraneous-dependencies
const hpp = require("hpp");
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
  whitelist: ["duration", "ratingsQuantity", "ratingsAverage", "maxGroupSize", "difficulty", "price", "priceDiscount", "summary", "description", "imageCover", "images", "createdAt", "updatedAt", "startDates"],
}));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);
app.use(express.static(`${__dirname}/public`));
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

app.use((req, res, next) => {
  console.log("Hello from the middleware 💕");
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
