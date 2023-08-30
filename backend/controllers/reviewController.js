const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getAverageRatingGrouped = catchAsync(async (req, res, next) => {
  const data = await Review.aggregate([
    {
      $group: {
        _id: "$locationName",
        locationAddress: { $first: "$locationAddress" }, // Take the first locationName within the group
        locationCoords: { $first: "$locationCoord" },
        numReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  res.status(200).json({
    status: "sucess",
    data: data,
  });
});

exports.getBestRatedLocation = catchAsync(async (req, res, next) => {
  const data = await Review.aggregate([
    {
      $match: {
        rating: {
          $gte: 4,
        },
      },
    },
    {
      $group: {
        _id: "$locationName",
        locationAddress: { $first: "$locationAddress" }, // Take the first locationName within the group
        locationCoords: { $first: "$locationCoord" },
        numReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
  ]);
  res.status(200).json({
    status: "sucess",
    data: data,
  });
});
