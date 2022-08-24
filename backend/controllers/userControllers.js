const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, isAdmin, pic });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

module.exports = { registerUser };
