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
        _id: "$locationAddress",
        numReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  res.status(200).json({
    status: "sucess",
    data: {
      data,
    },
  });
});
