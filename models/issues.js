const mongoose = require("mongoose");

const issueSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    desc: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
