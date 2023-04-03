const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt");
const SavedRoute = require("../models/SavedRoute");

// @desc    Get all User's saved routes
// @route   GET /saved-routes/all
// @access  Private
router.get("/all", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const savedRoutesInDB = await SavedRoute.find({ userId: _id });
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
  const {routeId} = req.params
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
        const savedRoutesFromDB = await SavedRoute.findOne({ routeId })
        if (savedRoutesFromDB) {
            res
              .status(400)
              .json({ message: "This route is already added" });
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
    const updatedRoute = await SavedRoute.findByIdAndUpdate(
      savedRouteId,
      {
        status,
      },
      { new: true }
    );
    res.status(201).json(updatedRoute);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a User's saved route
// @route   Delete /saved-routes/edit/:savedRouteId
// @access  Private
router.delete("/delete/:savedRouteId", isAuthenticated, async (req, res, next) => {
    const { savedRouteId } = req.params;
    const { _id } = req.payload;
  try {
    await SavedRoute.findOneAndDelete({ _id: savedRouteId });
   
      const allSavedRoutes = await SavedRoute.find({ userId: _id });
    res.status(200).json({ message: "Route deleted" });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
