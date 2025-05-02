const { mongo, default: mongoose } = require('mongoose');
const Assignment = require('../models/assignmentModel');

//get all assignments
const getAssignments = async (req, res) => {
    const assignments = await Assignment.find({}).sort({ createdAt: -1 });

    res.status(200).json(assignments);
};

//get a single assignment
const getAssignment = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Assignment not found' });
    }

    // check if assignment exists
    const assignment = await Assignment.findById(id);

    if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
    }

    res.status(200).json(assignment);
};

//create new assignment
const createAssignment = async (req, res) => {
    const { title, description, dueDate, courseName } = req.body;

    // add assignment to db
    try {
        const assignment = await Assignment.create({ title, description, dueDate, courseName });
        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete assignment
const deleteAssignment = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

   // delete assignment if it exists
    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
    }

    res.status(200).json(assignment);
};

//update assignment
const updateAssignment = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Assignment not found' });
    }

    // update assignment
    const updatedAssignment = await Assignment.findByIdAndUpdate(id, req.body);

    if (!updatedAssignment) {
        return res.status(404).json({ error: 'Assignment not found' });
    }

    res.status(200).json(updatedAssignment);
};

module.exports = {
    getAssignments,
    getAssignment,
    createAssignment,
    deleteAssignment,
    updateAssignment
};