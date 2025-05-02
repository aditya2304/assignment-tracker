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
    }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);