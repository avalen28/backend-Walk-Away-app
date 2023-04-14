const router = require("express").Router();
const Route = require("../models/Route");
const { isAuthenticated, isAdmin } = require("../middlewares/jwt");
const isValid = require("../utils/index");

// @desc    Get all Routes
// @route   GET /routes/all
// @access  Public
router.get("/all", async (req, res, next) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    next(error);
  }
});

// @desc    Get an especific Route
// @route   GET /routes/:routeId
// @access  private
router.get("/:routeId", isAuthenticated, async (req, res, next) => {
  const { routeId } = req.params;
  try {
    const route = await Route.findById(routeId);
    res.status(200).json(route);
  } catch (error) {
    next(error);
  }
});

// @desc    Post create a new Route
// @route   POST /routes/new
// @access  Private - Admin
router.post("/new", isAuthenticated, isAdmin, async (req, res, next) => {
  const { name,location, distance, level, description, estimatedDuration, inventary } =
    req.body;
  if (
    !isValid(name, "string") ||
    !isValid(location, "string") ||
    !isValid(distance, "number") ||
    !isValid(level, "number") ||
    !isValid(description, "string") ||
    !isValid(estimatedDuration, "number") ||
    !isValid(inventary, "inventary")
  ) {
    res.status(400).json({ message: "Please check your fields" });
    return;
  }
  try {
    const newRoute = await Route.create(req.body);
    res.status(201).json(newRoute);
  } catch (error) {
    next(error);
  }
});

// @desc    PUT edit route
// @route   PUT /routes/edit/:routeId
// @access  Private - Admin
router.put(
  "/edit/:routeId",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    const { routeId } = req.params;
    const {
      name,
      location,
      distance,
      level,
      description,
      estimatedDuration,
      inventary,
    } = req.body;

    if (
      !isValid(name, "string") ||
      !isValid(location, "string") ||
      !isValid(distance, "number") ||
      !isValid(level, "number") ||
      !isValid(description, "string") ||
      !isValid(estimatedDuration, "number") ||
      !isValid(inventary, "inventary")
    ) {
      res.status(400).json({ message: "Please check your fields" });
      return;
    }

    try {
      await Route.findByIdAndUpdate(routeId, req.body, { new: true });
      const updateRoute = await Route.findById(routeId);
      res.status(200).json(updateRoute);
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Delete delete Route
// @route   DELETE /routes/delete/:routeId
// @access  Private - Admin
router.delete(
  "/delete/:routeId",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    const { routeId } = req.params;
    try {
      await Route.findByIdAndDelete(routeId);
      const allRoutes = await Route.find();
      res.status(200).json(allRoutes);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
