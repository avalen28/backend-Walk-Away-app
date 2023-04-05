const router = require("express").Router();
const User = require("../models/User");
const Inventary = require("../models/Inventary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated, isAdmin } = require("../middlewares/jwt");
const saltRounds = 10;
const isValid = require("../utils/index");

// @desc    SIGN UP new user
// @route   POST /api/v1/auth/signup
// @access  Public
// @Postman Checked
router.post("/signup", async (req, res, next) => {
  const { email, password1, password2, username } = req.body;
  if (!isValid(username, "string")) {
    res.status(400).json({ message: "Please provide a valid user name" });
    return;
  }
  if (!isValid(email, "email")) {
    res.status(400).json({ message: "Not a valid email format" });
    return;
  }
  if (!isValid(password1, "password")) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter",
    });
    return;
  }
  if (password1 !== password2) {
    res.status(400).json({ message: "Please check both passwords" });
    return;
  }
  try {
    const userInDB = await User.findOne({ email });
    if (userInDB) {
      res
        .status(400)
        .json({ message: `User already exists with email ${email}` });
      return;
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password1, salt);
      const newUser = await User.create({ email, hashedPassword, username });
      console.log(newUser)
      const newUserInventary = await Inventary.create({ userId: newUser._id });
      console.log(newUserInventary)
      res.status(201).json({ data: newUser });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    LOG IN user
// @route   POST /api/v1/auth/login
// @access  Public
// @Postman Checked
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!isValid(email, "email")) {
    res.status(400).json({ message: "Not a valid email format" });
    return;
  }
  if (!isValid(password, "password")) {
    res.status(400).json({
      message: "Please check your password",
    });
    return;
  }
  try {
    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      res.status(404).json({
        success: false,
        message: `No user registered by email ${email}`,
      });
      return;
    } else {
      const passwordMatches = bcrypt.compareSync(
        password,
        userInDB.hashedPassword
      );
      if (passwordMatches) {
        // Let's create what we want to store in the jwt token
        const payload = {
          username: userInDB.username,
          img: userInDB.img,
          email: userInDB.email,
          experiencePoints: userInDB.experiencePoints,
          level: userInDB.level,
          isAdmin: userInDB.isAdmin,
          _id: userInDB._id,
        };
        // Use the jwt middleware to create de token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "30d",
        });
        res.status(200).json({ authToken: authToken });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Unable to authenticate user" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// @desc    GET logged in user
// @route   GET /api/v1/auth/me
// @access  Private
// @Postman Checked
router.get("/me", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log("Whose token is on the request:", req.payload);
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
