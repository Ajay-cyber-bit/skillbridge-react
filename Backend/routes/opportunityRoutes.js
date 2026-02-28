const express = require("express");
const router = express.Router();

const {
  createOpportunity,
  getOpportunities,
  deleteOpportunity
} = require("../controllers/opportunityController");

// ✅ CREATE
router.post("/create", createOpportunity);

// ✅ GET ALL
router.get("/", getOpportunities);

// ✅ DELETE
router.delete("/:id", deleteOpportunity);

module.exports = router;