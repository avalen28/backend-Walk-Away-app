const router = require("express").Router();
const { model } = require("mongoose");
const Inventary = require("../models/Inventary");

// @desc    Get the User's inventary
// @route   GET /inventary/:userId
// @access  Public
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  //de momento uso params. el id del user se tiene que sacar por payload
  try {
    const userInventary = await Inventary.findOne({ userId: userId });
    res.status(200).json(userInventary);
  } catch (error) {
    next(error);
  }
});

// @desc    PUT edit User's inventary
// @route   PUT /inventary/edit/:userId
// @access  Public
router.put("/edit/:userId", async (req, res, next) => {
  const { userId } = req.params;
  //de momento uso params. el id del user se tiene que sacar por payload
  try {
    await Inventary.findOneAndUpdate(
      { userId: userId },
      req.body,
      {
        new: true,
      }
    );
    const updateUserInventary = await Inventary.findOne({ userId: userId });
    res.status(200).json(updateUserInventary);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
