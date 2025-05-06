const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    estimatedTime: {
        type: Number,
        required: true
    },
}, { timestamps: true });

// Create a compound index
assignmentSchema.index({ courseName: 1, dueDate: 1 });

// Create a single field indexes
assignmentSchema.index({ courseName: 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);