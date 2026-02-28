const Opportunity = require("../models/Opportunity");

// ✅ CREATE OPPORTUNITY
exports.createOpportunity = async (req, res) => {
  try {
    const { title, description, required_skills, duration, location, ngo_id } = req.body;

    // 🔥 Validation
    if (!title || !description || !required_skills || required_skills.length === 0) {
      return res.status(400).json({
        message: "Title, description and required skills are mandatory"
      });
    }

    if (!ngo_id) {
      return res.status(400).json({
        message: "NGO ID is required"
      });
    }

    const newOpportunity = await Opportunity.create({
      title,
      description,
      required_skills,
      duration,
      location,
      ngo_id
    });

    res.status(201).json({
      message: "Opportunity created successfully",
      opportunity: newOpportunity
    });

  } catch (error) {
    console.log("===== ERROR OCCURRED =====");
    console.log(error);
    console.log("==========================");

    res.status(500).json({
      message: error.message
    });
  }
};


// ✅ GET ALL OPPORTUNITIES
exports.getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate("ngo_id", "name email");

    res.status(200).json(opportunities);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ✅ DELETE OPPORTUNITY
exports.deleteOpportunity = async (req, res) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};