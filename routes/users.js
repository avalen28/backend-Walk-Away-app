const router = require("express").Router()
const User = require("../models/User")
const Inventary = require("../models/Inventary")
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// @desc    Get all Users
// @route   GET /users/all
// @access  Public
router.get("/all", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// @desc    Get an especific User
// @route   GET /users/:userId
// @access  Public
router.get("/:userId", async (req, res, next) => {
    const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// @desc    PUT edit Users
// @route   PUT /users/edit/:userId
// @access  Public
router.put("/edit/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password1, password2 } = req.body;

  //Check all fields on edit body are filled
  if (username === "" || email === "" || password1 === "" || password2 === "") {
    res.status(400).json({ message: "Please fill all the fields to edit" });
    return;
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Not a valid email format" });
    return;
  }
// Check if both passwords are the same
  if (password1 !== password2) {
    res.status(400).json({ message: "Please check your password" });
    return;
  }
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password1)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter",
    });
    return;
  }

  try {
    await User.findByIdAndUpdate(userId, req.body, { new: true });
    const updateUser = await User.findById(userId);
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete delete User and Inventary
// @route   DELETE /users/delete/:userId
// @access  Public
router.delete("/delete/:userId", async (req, res, next) => {
    const { userId } = req.params;
  try {
      await User.findByIdAndDelete(userId);
      await Inventary.findOneAndDelete(userId)
      const allUsers = await User.find()

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});



module.exports = router;