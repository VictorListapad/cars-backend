const { Schema, model } = require("mongoose");

const MakerSchema = Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
});

module.exports = model("Maker", MakerSchema);
