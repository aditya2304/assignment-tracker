const express = require('express');

const router = express.Router();

const {
    getAssignments,
    getAssignment,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    getCourseNames
} = require('../controllers/assignmentController');

const Assignment = require('../models/assignmentModel');

// GET all course names
router.get('/course-names', getCourseNames);

// GET all assignments
router.get('/', getAssignments);

// GET a single assignment
router.get('/:id', getAssignment);

// POST a new assignment
router.post('/', createAssignment);

// DELETE an assignment
router.delete('/:id', deleteAssignment);

// UPDATE an assignment
router.patch('/:id', updateAssignment);

module.exports = router;