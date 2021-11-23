const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB..."))
  .catch(() => console.log("Couldn't connect to DB!"));
app.get("/", (req, res) => {
  return res.json({ name: "Victor" });
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server running...");
});
