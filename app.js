const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("dev"));
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use((req,res,next)=>{
    console.log("Hello from the middleware 💕");
    next();
});


app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);




module.exports = app;