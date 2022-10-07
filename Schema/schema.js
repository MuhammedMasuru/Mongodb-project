const mongoose = require("mongoose");

const BallSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    author: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ball = mongoose.model("Ball", BallSchema);
module.exports = ball;
