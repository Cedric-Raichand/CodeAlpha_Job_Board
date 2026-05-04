const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Job = require("../models/Job");


// APPLY FOR JOB
router.post("/", async (req, res) => {
  try {
    const { jobId, name, email, resume } = req.body;

    // check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = new Application({
      jobId,
      name,
      email,
      resume
    });

    await application.save();

    res.status(201).json(application);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  GET ALL APPLICATIONS
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate("jobId");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET APPLICATIONS FOR A JOB
router.get("/job/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({
      jobId: req.params.jobId
    });

    res.json(applications);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
