const router = require("express").Router();
const { model } = require("mongoose");
const { isAuthenticated, isAdmin } = require("../middlewares/jwt");
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

//WIP!!!!!!-------------------------------------
// @desc    PUT edit User's inventary
// @route   PUT /inventary/edit
// @access  Prtivate
router.put("/edit/",isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { food, drinks, sportwear, footwear, other } = req.body
  if (typeof(food)  == "boolean") {
    res.status(400).json({ message: "Prueba" });
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
