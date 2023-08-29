const mongoose = require("mongoose");
const validate = require("validator");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A review must include a title"],
      trim: true,
    },
    locationCoord: {
      type: [Number, Number],
      trim: true,
      required: [true, "A review must include a location"],
    },
    locationAddress: {
      type: String,
      required: [true, "A review must include a location"],
    },
    locationName: {
      type: String,
      required: [true, "A review must include the name of the place"],
    },
    coffeeType: {
      type: String,
      trim: true,
      required: [true, "A review must include a coffee type"],
    },
    price: {
      type: String,
      enum: ["low", "medium", "high"],
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
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this
    // populate({
    //   path: 'tour',
    //   select: 'name',
    // }).
    .populate({
      path: "user",
      select: "name username photo",
    });
  next();
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
