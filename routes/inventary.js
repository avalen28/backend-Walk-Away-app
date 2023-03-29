const router = require("express").Router();
const { model } = require("mongoose");
const { isAuthenticated, isAdmin } = require("../middlewares/jwt");
const isValid = require("../utils/index")
const Inventary = require("../models/Inventary");

// @desc    Get the User's inventary
// @route   GET /inventary
// @access  Private
// @Postman Checked
router.get("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const userInventary = await Inventary.findOne({ userId: _id });
    res.status(200).json(userInventary);
  } catch (error) {
    next(error);
  }
});

// @desc    PUT edit User's inventary
// @route   PUT /inventary/edit
// @access  Private
// @Postman Checked
router.put("/edit",isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { food, drinks, sportwear, footwear, other } = req.body
  if (
    !isValid(food, "boolean") ||
    !isValid(drinks, "boolean") ||
    !isValid(sportwear, "boolean") ||
    !isValid(footwear, "boolean") ||
    !isValid(other,"array")
  ) {
    res.status(400).json({ message: "Please check your fields" });
    return;
  }
  try {
    await Inventary.findOneAndUpdate({ userId: _id }, req.body, {
      new: true,
    });
    const updateUserInventary = await Inventary.findOne({ userId: _id });
    res.status(200).json(updateUserInventary);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
