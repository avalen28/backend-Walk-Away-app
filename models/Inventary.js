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
      type: Boolean,
      default: false,
    },
    drinks: {
      type: Boolean,
      default: false,
    },
    sportswear: {
      type: Boolean,
      default: false,
    },
    footwear: {
      type: Boolean,
      default: false,
    },
    other: [String],
  },
  {
    timestamps: true,
  }
);

const Inventary = model("Inventary", inventarySchema);
module.exports = Inventary;
