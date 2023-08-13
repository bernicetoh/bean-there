const express = require("express");
const morgan = require("morgan");
const reviewRouter = require("./routes/reviewRoutes");
const app = express();

app.use(express.json());
app.use(express.static(`../frontend`));

app.use("/api/v1/reviews", reviewRouter);
module.exports = app;
