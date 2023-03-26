const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const savedRouteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: Route,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "started", "finished"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SavedRoute = model("SavedRoute", savedRouteSchema);
module.exports = SavedRoute;
