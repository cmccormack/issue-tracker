const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: '' },
  status_text: { type: String, default: '' },
  created_on: { type: Date, default: new Date().getTime() },
  updated_on: { type: Date, default: new Date().getTime() },
  open: { type: Boolean, default: true }
})

const Issue = mongoose.model("Issue", issueSchema, "issues")

module.exports = Issue