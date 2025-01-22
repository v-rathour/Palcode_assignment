const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const playListRoute = require("./routes/playlistRoutes");
const PORT = 8000;


mongoose
  .connect("mongodb://127.0.0.1:27017/FigmaStructure")
  .then(() => {
    console.log("Database connection established!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // req.body

app.use(cors({ origin: ["http://localhost:5173"] }));

// Import the router files

// Use the routers
app.use("/user", userRoutes);
app.use("/playlist", playListRoute);

app.listen(PORT, () => {
  console.log("listening on port 8000");
});
