const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();
const Track = mongoose.model("Track");

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  const userId = req.user._id;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide name and locations" });
  }

  try {
    const track = new Track({ name, locations, userId });
    await track.save();
    res.send(track);
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

module.exports = router;
