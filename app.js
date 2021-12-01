const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const app = express();

require("dotenv").config();

// DB CONNECTION
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB..."))
  .catch(() => console.log("Couldn't connect to DB!"));

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

// ROUTES
app.use("/api/v1/makers", require("./routes/maker"));
app.use("/api/v1/cars", require("./routes/car"));
app.use("/api/v1/auth", require("./routes/auth"));
// PORT AND LISTEN
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running...");
});
