const router = require("express").Router()
const User = require("../models/User")
const Inventary = require("../models/Inventary")

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

// @desc    PUT edit User
// @route   PUT /users/edit/:userId
// @access  Public
router.put("/edit/:userId", async (req, res, next) => {
    const { userId } = req.params;
  try {
      await User.findByIdAndUpdate(userId, req.body, { new: true });
      const updateUser = await User.findById(userId)
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