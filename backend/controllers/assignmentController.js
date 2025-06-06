const { mongo, default: mongoose } = require('mongoose');
const Assignment = require('../models/assignmentModel');

//get all assignments
const getAssignments = async (req, res) => {
    // Check for course filter
    const { courseName } = req.query;

    // Apply filter if courseName is provided
    const filter = courseName ? { courseName } : {};

    // This query is optimized by the compound index { courseName: 1, dueDate: 1 }.
    const assignments = await Assignment.find(filter).sort({ dueDate: 1 });

    res.status(200).json(assignments);
};

//get all unique course names
const getCourseNames = async (req, res) => {
    try {
        // this query is optimized by the single field index { courseName: 1 }.
        const courseNames = await Assignment.distinct('courseName');
        res.status(200).json(courseNames);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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
    const { title, description, dueDate, courseName, estimatedTime } = req.body;

    // add assignment to db
    try {
        const assignment = await Assignment.create({ title, description, dueDate, courseName, estimatedTime });
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

    // Update the findByIdAndUpdate to return the updated document
    const updatedAssignment = await Assignment.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true }
    );

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
    updateAssignment,
    getCourseNames
};