const router = require("express").Router();
const User = require("../models/User");
const Inventary = require("../models/Inventary");
const { isAuthenticated, isAdmin } = require("../middlewares/jwt");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const isValid = require("../utils/index");

// @desc    Get all Users
// @route   GET /users/all
// @access  Private - Admin
// @Postman Checked
router.get("/all", isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// @desc    Get an especific User
// @route   GET /users/me
// @access  Private
// @Postman Checked
router.get("/me", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// @desc    PUT edit User in session
// @route   PUT /users/edit/
// @access  Private
// @Postman Checked
router.put("/edit", isAuthenticated, async (req, res, next) => {
 
  const { _id } = req.payload;
  const { username, email, img, password1, password2 } = req.body;

  if (!isValid(username, "string")) {
    res.status(400).json({ message: "Please provide a valid user name" });
    return;
  }
  if (!isValid(img, "string")) {
    res.status(400).json({ message: "Please provide a valid url image" });
    return;
  }
  if (!isValid(email, "email")) {
    res.status(400).json({ message: "Not a valid email format" });
    return;
  }

  if (password1 && password2) {
    if (password1 !== password2) {
      res.status(400).json({ message: "Please check both passwords" });
      return;
    }
    if (!isValid(password1, "password")) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter",
      });
      return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password1, salt);
    req.body.hashedPassword = hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
     const payload = {
       username: updatedUser.username,
       img: updatedUser.img,
       email: updatedUser.email,
       experiencePoints: updatedUser.experiencePoints,
       level: updatedUser.level,
       isAdmin: updatedUser.isAdmin,
       _id: updatedUser._id,
     };
     const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
       algorithm: "HS256",
       expiresIn: "30d",
     });
    res.status(200).json({updatedUser,authToken});
  } catch (error) {
    next(error);
  }
});

// @desc    Delete delete User and Inventary
// @route   DELETE /users/delete
// @access  Private
// @Postman Checked
router.delete("/delete", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    await Inventary.findOneAndDelete({ userId: _id });
    await User.findByIdAndDelete(_id);
    const allUsers = await User.find();
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
