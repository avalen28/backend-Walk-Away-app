const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt");
const SavedRoute = require("../models/SavedRoute");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc    Get all User's saved routes
// @route   GET /saved-routes/all
// @access  Private
router.get("/all", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const savedRoutesInDB = await SavedRoute.find({ userId: _id }).populate(
      "routeId"
    );
    res.status(200).json(savedRoutesInDB);
  } catch (error) {
    next(error);
  }
});
// @desc    Get single User's saved routes
// @route   GET /saved-routes/:routeId
// @access  Private
router.get("/:routeId", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { routeId } = req.params;
  try {
    const savedRoutesInDB = await SavedRoute.findOne({ userId: _id, routeId });
    res.status(200).json(savedRoutesInDB);
  } catch (error) {
    next(error);
  }
});

// @desc    Create a User's saved route
// @route   POST /saved-routes/add/:routeId
// @access  Private
router.post("/add/:routeId", isAuthenticated, async (req, res, next) => {

  const { _id } = req.payload;
  const { routeId } = req.params;
  try {
    const savedRoutesFromDB = await SavedRoute.findOne({ routeId });
    if (savedRoutesFromDB) {
      res.status(400).json({ message: "This route is already added" });
      return;
    } else {
      const newSavedRouteFromDB = await SavedRoute.create({
        userId: _id,
        routeId: routeId,
        status: "pending",
      });
      res.status(201).json(newSavedRouteFromDB);
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a User's saved route
// @route   PUT /saved-routes/edit/:savedRouteId
// @access  Private
router.put("/edit/:savedRouteId", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { savedRouteId } = req.params;
  const { status } = req.body;

  if (status !== "pending" && status !== "started" && status !== "finished") {
    res.status(400).json({ message: "Please provide a valid status" });
    return;
  }
  try {
    if (status === "finished") {
      const userFromDB = await User.findById(_id);
      const { level, experiencePoints } = userFromDB;
      const routeFromDB = await SavedRoute.findById(savedRouteId).populate(
        "routeId"
      );

      const levelRoute = routeFromDB.routeId.level;
      const experienceUp = experiencePoints + levelRoute * 100;
      let levelToUpdate = 0;

      switch (true) {
        case experienceUp < 200:
          levelToUpdate = 1;
          break;

        case experienceUp >= 200 && experienceUp < 500:
          levelToUpdate = 2;
          break;

        case experienceUp >= 500 && experienceUp < 900:
          levelToUpdate = 3;
          break;

        case experienceUp >= 900 && experienceUp < 1400:
          levelToUpdate = 4;
          break;

        case experienceUp >= 1400:
          levelToUpdate = 5;
          break;

        default:
          levelToUpdate = level;
          break;
      }
      const updatedRoute = await SavedRoute.findByIdAndUpdate(
        savedRouteId,
        {
          status,
        },
        { new: true }
      );
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          level: levelToUpdate,
          experiencePoints: experienceUp,
        },
        { new: true }
      );
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
      res.status(200).json({ updatedRoute, authToken });
    } else {
      const updatedRoute = await SavedRoute.findByIdAndUpdate(
        savedRouteId,
        {
          status,
        },
        { new: true }
      );
      res.status(201).json(updatedRoute);
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a User's saved route
// @route   Delete /saved-routes/delete/:savedRouteId
// @access  Private
router.delete(
  "/delete/:savedRouteId",
  isAuthenticated,
  async (req, res, next) => {
    const { savedRouteId } = req.params;
    const { _id } = req.payload;
    try {
      await SavedRoute.findOneAndDelete({ _id: savedRouteId });

      const allSavedRoutes = await SavedRoute.find({ userId: _id });
      res.status(200).json({ message: "Route deleted" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
