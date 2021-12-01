const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

module.exports = model("User", UserSchema);
