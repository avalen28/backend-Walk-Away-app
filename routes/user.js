const router = require("express").Router()
const User = require("../models/User")

// @desc    Get all users
// @route   GET /users
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});




module.exports = router;