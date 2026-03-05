const express = require("express");
const router = express.Router();
const Application = require("../models/Application");


// APPLY
router.post("/apply", async (req, res) => {
  try {
    const { volunteerId, opportunityId } = req.body;

    const existing = await Application.findOne({
      volunteerId,
      opportunityId
    });

    if (existing) {
      if (existing.status === "rejected") {
        return res.json({
          message: "You cannot apply again for this opportunity"
        });
      }

      return res.json({
        message: "You have already applied"
      });
    }

    const application = new Application({
      volunteerId,
      opportunityId
    });

    await application.save();

    res.json({
      message: "Application submitted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET USER APPLICATIONS
router.get("/user/:id", async (req, res) => {

  const apps = await Application.find({
    volunteerId: req.params.id
  });

  res.json(apps);

});


// GET APPLICATIONS FOR OPPORTUNITY
router.get("/opportunity/:id", async (req, res) => {

  const applications = await Application.find({
    opportunityId: req.params.id
  }).populate("volunteerId");

  res.json(applications);

});


// UPDATE STATUS
router.put("/update-status/:id", async (req, res) => {

  const { status } = req.body;

  const updated = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);

});

module.exports = router;