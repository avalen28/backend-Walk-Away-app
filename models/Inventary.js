const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const inventarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    food: {
      type: String,
      enum: ["Empty", "Lunch", "Snacks", "All day meal", "Two days meal"],
      default: "Empty",
    },
    drinks: {
      type: String,
      enum: ["Empty", "1L.", "1.5L.", "2L.", "Isotonic drink"],
      default: "Empty",
    },
    sportswear: {
      type: String,
      enum: [
        "Empty",
        "Trekking clothes (spring weather)",
        "Moutain clothes(winter weather)",
        "High Mountain clothes",
        "Long Route",
      ],
      default: "Empty",
    },
    footwear: {
      type: String,
      enum: [
        "Empty",
        "Light boots or trekking slippers",
        "Moutain boots",
        "High Mountain boots",
      ],
      default: "Empty",
    },
    other: [String],
  },
  {
    timestamps: true,
  }
);

const Inventary = model("Inventary", inventarySchema);
module.exports = Inventary;
