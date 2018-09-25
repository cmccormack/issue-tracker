const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema({
  project: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdBy: { type: String, required: true },
  assignedTo: { type: String },
  statusText: { type: String },
})

const Issue = mongoose.model("Issue", issueSchema, "issues")

module.exports = Issue