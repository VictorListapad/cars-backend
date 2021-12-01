const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { generateJwt } = require("../helpers/generateJwt");

router.post("/signup", async (req, res) => {
  const { email } = req.body;
  const checkExistEmail = await User.findOne({ email });
  if (checkExistEmail) {
    return res.status(500).json("Couldn't sign up. Try Again");
  }
  const user = new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create the user" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(500)
      .json({ message: "Invalid email/password. Please try again" });
  }
  const correctPassword = bcrypt.compareSync(password, user.password);
  if (!correctPassword) {
    return res
      .status(500)
      .json({ message: "Invalid email/password. Please try again" });
  }
  const token = await generateJwt(user._id);
  return res.status(200).json(user);
});

// GET ALL USERS
router.get("/", async (req, res) => {
  const users = await User.find();
  try {
    if (users.length === 0) {
      return res.status(400).json({ message: "No users in database" });
    }
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// GET ONE USER
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Couldnt get the user" });
  }
});

// UPDATE USER
router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const userToUpdate = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(userToUpdate);
  } catch (err) {
    return res.status(500).json({ message: "Can't retreive the user" });
  }
});

// DELETE USER
router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
