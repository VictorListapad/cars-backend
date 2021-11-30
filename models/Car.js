const { Schema, model } = require("mongoose");

const CarSchema = Schema({
  name: { type: String, required: true, trim: true },
  maker: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Maker",
  },
  year: { type: Number, required: true, trim: true },
  miles: { type: Number, required: true, trim: true },
  engine: { type: String, required: true, trim: true },
  doors: {
    type: Number,
    required: true,
    trim: true,
  },
  bodyStyle: {
    type: String,
    required: true,
    enum: [
      "Sedan",
      "SUV",
      "Compact",
      "Wagon",
      "Coupe",
      "Van",
      "Hatchback",
      "Pickup",
      "Sport coupe",
    ],
  },
  price: { type: String, required: true },
  description: { type: String, trim: true },
  image: { type: String },
  contact: { type: String, required: true },
});
module.exports = model("Car", CarSchema);
