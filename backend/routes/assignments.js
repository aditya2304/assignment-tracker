const express = require('express');

const router = express.Router();

const {
    getAssignments,
    getAssignment,
    createAssignment,
    deleteAssignment,
    updateAssignment
} = require('../controllers/assignmentController');

const Assignment = require('../models/assignmentModel');

// GET all assignments
router.get('/', getAssignments);

// GET a single assignment
router.get('/:id', getAssignment);

// POST a new assignment
router.post('/', createAssignment);

// DELETE a new assignment
router.delete('/:id', deleteAssignment);

// UPDATE a new assignment
router.patch('/:id', updateAssignment);

module.exports = router;