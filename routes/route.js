const router = require("express").Router()
const Route = require("../models/Route")

// @desc    Get all Routes
// @route   GET /route/all
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
// @route   GET /route/:routeId
// @access  Public
router.get("/:routeId", async (req, res, next) => {
  const { routeId } = req.params;
  try {
    const route = await Route.findById(routeId);
    res.status(200).json(route);
  } catch (error) {
    next(error);
  }
});

// @desc    Post create a new Route
// @route   POST /route/new
// @access  Public
router.post("/new", async (req, res, next) => {
  try {
      const newRoute = await Route.create(req.body);
      res.status(201).json(newRoute);
      
  } catch (error) {
    next(error);
  }
});

// @desc    PUT edit route
// @route   PUT /edit/:routeId
// @access  Public
router.put("/edit/:routeId", async (req, res, next) => {
    const { routeId } = req.params;
  try {
      await Route.findByIdAndUpdate(routeId, req.body, { new: true });
      const updateRoute = await Route.findById(routeId)
    res.status(200).json(updateRoute);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete delete Route
// @route   DELETE /delete/:routeId
// @access  Public
router.delete("/delete/:routeId", async (req, res, next) => {
  const { routeId } = req.params;
  try {
    await Route.findByIdAndDelete(routeId);
    const allRoutes = await Route.find();
    res.status(200).json(allRoutes);
  } catch (error) {
    next(error);
  }
});

module.exports = router