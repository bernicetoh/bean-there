const AppError = require("../utils/AppError");
const handleJWTError = () =>
  new AppError("Invalid token. Please login again", 401);

const handleTokenExpiredError = () =>
  new AppError("Your token has expired. Please log in again", 401);
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError();
    }
    if (error.name === "TokenExpiredError") {
      error = handleTokenExpiredError();
    }
    sendErrorProd(err, res);
  }
};
