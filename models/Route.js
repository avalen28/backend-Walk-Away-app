const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const routeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
      min: 0,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    estimatedDuration: {
      type: Number,
      required: true,
      min: 1,
    },
    inventary: {
      type: [String],
      required: true,
    },
    tips: {
      type: String,
      default: "No tips for this route"
    }
  },
  {
    timestamps: true,
  }
);
const Route = model("Route", routeSchema)
module.exports = Route