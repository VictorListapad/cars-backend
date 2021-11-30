const express = require("express");
const router = express.Router();

const Maker = require("../models/Maker");

// GET ALL
router.get("/", async (req, res) => {
  const makers = await Maker.find();
  try {
    if (makers.length === 0) {
      return res.status(400).json({ message: "No makers in database" });
    }
    return res.status(200).json(makers);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// GET ONE
router.get("/maker/:id", async (req, res) => {
  const { id } = req.params;
  const maker = await Maker.findById(id);
  try {
    return res.status(200).json(maker);
  } catch (error) {
    return res.status(500).json({ message: "Cannot get the maker" });
  }
});

// POST
router.post("/maker", async (req, res) => {
  const makerToCreate = await Maker.create(req.body);
  try {
    return res.status(201).json(makerToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Cannot create a maker" });
  }
});

// UPDATE (PUT)
router.put("/maker/:id", async (req, res) => {
  const { id } = req.params;
  const makerToUpdate = await Maker.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(makerToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't update the maker" });
  }
});

router.delete("/maker/:id", async (req, res) => {
  const { id } = req.params;
  const carToDelete = await Maker.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Maker succesfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Cannot delete maker" });
  }
});

module.exports = router;
