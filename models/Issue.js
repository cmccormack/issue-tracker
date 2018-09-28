const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String },
  status_text: { type: String },
})

const Issue = mongoose.model("Issue", issueSchema, "issues")

module.exports = Issue