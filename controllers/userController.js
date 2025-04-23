const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users
        }
    });
});

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for updating passwords. Please use /updatePassword", 400));
  }
  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: false,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {active: false});
  res.status(204).json({status: "success", data: null});
});

const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined! Please use /users instead"
    });
}

const getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined! Please use /users instead"
    });
}

const updateUser = factory.updateOne(User);


const deleteUser = factory.deleteOne(User);


module.exports = {getAllUsers, createUser, getUser, updateUser, deleteUser, updateMe, deleteMe};