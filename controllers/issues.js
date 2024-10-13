const Issue = require("../models/issues");

// POST
const createIssue = async (req, res) => {
  const { id, title, desc } = req.body;

  try {
    if (!id || !title || !desc) {
      return res.status(400).json({ message: "Please complete fields" });
    }
    const issueExists = await Issue.findOne({ title, desc });
    if (issueExists) {
      return res.status(400).json({
        message: "Issue with the same title or description already exists.",
      });
    }
    const issue = await Issue.create({ id, title, desc });
    return res.status(201).json({
      message: `Issue ${id} with title ${title} succesfully added.`,
      issue: issue,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

//GET

const getIssues = async (req, res) => {
  try {
    const Issues = await Issue.find();
    return res.status(200).json(Issues);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      res.status(404);
      return res.status(404).json({ error: "Issue not found" });
    }
    return res.status(200).json(issue);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE

const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      res.status(404);
      return res.status(404).json({ error: "Issue not found, cannot update" });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json({ ...updatedIssue._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

//DELETE
const deleteIssue = async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  if (!issue) {
    res.status(404);
    return res.status(404).json({ error: "Issue not found, cannot delete." });
  }
  await Issue.findByIdAndDelete(req.params.id);
  return res.status(204).json({ message: "Issue has been deleted" });
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
