const express = require("express");
const router = express.Router();

const {
  createIssue,
  getIssues,
  getIssueById,
  deleteIssue,
  updateIssue,
} = require("../controllers/issues");

router.route("/get").get(getIssues);
router.route("/create").post(createIssue);
router.route("/:id").get(getIssueById).put(updateIssue).delete(deleteIssue);

module.exports = router;
