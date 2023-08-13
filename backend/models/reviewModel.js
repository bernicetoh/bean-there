const mongoose = require("mongoose");
const validate = require("validator");

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A review must include a name"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    coffeeType: {
      type: String,
      trim: true,
      required: [true, "A review must include a coffee type"],
    },
    price: {
      type: Number,
      required: [true, "A review must include a price of the coffee purchased"],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      min: [0, "Rating must be above 0"],
      max: [5, "Rating must be below 5.0"],
    },
    visitedAt: {
      type: Date,
      default: Date.now(),
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
