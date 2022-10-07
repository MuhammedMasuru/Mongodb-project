const express = require("express");
const mongoose = require("mongoose");

const Ball = require("./Schema/schema");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5000 || 8080;
const db = process.env.DB_LOCAL;
const dbonline = process.env.DB_ONLINE;

// app.get("/", (req, res) => {
//   res.send("Test the server locally");
// });
// connectingg to your mongodb server
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the main homepage");
});

app.post("/add", async (req, res) => {
  const { name, description, author, email } = req.body;
  const ball = await Ball.create({
    name,
    description,
    author,
    email,
  });
  if (ball) {
    res.status(200).json({
      status: true,
      message: "base ball created",
      data: ball,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "base ball not created",
    });
  }
});

// Getting data from the database

app.get("/getAllBalls", async (req, res) => {
  const Balls = await Ball.find();
  if (Balls) {
    res.status(200).json({
      status: true,
      message: "Bingo, You doing great",
      data: Balls,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Sorry, something went wrong",
    });
  }
});

// Deleting data from the database by it's ID

// app.delete("/remove/:id", async (req, res) => {
//   const = await Ball.findByIdAndDelete(req.params.id);
// });
// if (data) {
//   res.status(200).json({
//     status: true,
//     message: "Ball has been deleted with no error",
//     data: data,
//   });
// } else {
//   res.status(400).json({
//     status: false,
//     message: "Sorry, unable to delete Ball",
//   });
//

// Editing ball info in our database using PATCH method
app.patch("/patch/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, author, email } = req.body;

  const ball = await Ball.updateOne({
    name: name,
    description: description,
    author: author,
    email: email,
  }).where({ _id: id });

  if (ball) {
    res.status(200).json({
      status: true,
      message: "updated",
      data: ball,
    });
  } else {
    res.send(400).json({
      status: false,
      message: "update was unsuccessful",
    });
  }
});

// Another way of editing the database using PUTCH
// app.patch("/patch/:id", async (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   const ball = await Ball.updateOne(changes).where({ _id: id });

//   if (ball) {
//     res.status(200).json({
//       status: true,
//       message: "updated",
//       data: ball,
//     });
//   } else {
//     res.send(400).json({
//       status: false,
//       message: "update was unsuccessful",
//     });
//   }
// });

//  Editing the database using PUT method
app.put("/put/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, author, email } = req.body;

  const ball = await Ball.updateOne({
    name: name,
    description: description,
    author: author,
    email: email,
  }).where({ _id: id });

  if (ball) {
    res.status(200).json({
      status: true,
      message: "updated",
      data: ball,
    });
  } else {
    res.send(400).json({
      status: false,
      message: "update was unsuccessful",
    });
  }
});

app.listen(8000, () => {
  console.log("server connected");
});
