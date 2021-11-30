const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const Car = require("../models/Car");

// GET ALL
router.get("/", async (req, res) => {
  const cars = await Car.find().populate("maker");
  try {
    if (cars.length === 0) {
      return res.status(400).json({
        message: "No cars in the database",
      });
    }
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ message: "Can't get the car data" });
  }
});

// GET ONE
router.get("/car/:id", async (req, res) => {
  const { id } = req.params;
  const car = await Car.findById(id).populate("maker");
  try {
    return res.status(200).json(car);
  } catch (error) {
    return res.status(500).json({ message: "Can't get the car" });
  }
});

// UPLOAD IMAGE
router.post("/car/imageUpload/:id", async (req, res) => {
  const { id } = req.params;
  const carToUpdate = await Car.findById(id);

  if (carToUpdate.image) {
    let array = carToUpdate.image.split("/");
    let fileName = array[array.length - 1];
    const [public_id] = fileName.split(".");
    await cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.image;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  carToUpdate.image = secure_url;
  await carToUpdate.save();
  try {
    return res.status(201).json(carToUpdate);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured while uploading the image" });
  }
});

// POST
router.post("/car", async (req, res) => {
  const carToCreate = await Car.create(req.body);
  try {
    return res.status(201).json(carToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Can't create new car" });
  }
});

// UPDATE (PUT)
router.put("/car/:id", async (req, res) => {
  const { id } = req.params;
  const carToUpdate = await Car.findByIdAndUpdate(id, req.body, { new: true });
  try {
    return res.status(202).json(carToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Cannot update the car" });
  }
});

// DELETE
router.delete("/car/:id", async (req, res) => {
  const { id } = req.params;
  await Car.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Deleted!" });
  } catch (error) {
    return res.status(500).json("Cannot delete the car");
  }
});

module.exports = router;
