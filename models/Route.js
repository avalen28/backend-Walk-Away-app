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
      type: {
        drinks: {
          type: String,
          enum: ["1L.", "1.5L.", "2L.", "Isotonic drink"],
          required: true,
        },
        food: {
          type: String,
          enum: ["Lunch", "Snacks", "All day meal", "Two days meal"],
          required: true,
        },
        sportswear: {
          type: String,
          enum: [
            "Trekking clothes (spring weather)",
            "Moutain clothes(winter weather)",
            "High Mountain clothes",
            "Long Route",
          ],
          required: true,
        },
        footwear: {
          type: String,
          enum: [
            "Light boots or trekking slippers",
            "Moutain boots",
            "High Mountain boots",
          ],
          required: true,
        },
      },
      required: true,
    },
    tips: {
      type: String,
      default: "No tips for this route",
    },
  },
  {
    timestamps: true,
  }
);
const Route = model("Route", routeSchema)
module.exports = Route