// AssignmentForm.js
import { useState } from 'react';

const AssignmentForm = ({ assignment, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(assignment ? assignment.title : '');
    const [description, setDescription] = useState(assignment ? assignment.description : '');
    const [dueDate, setDueDate] = useState(assignment ? assignment.dueDate.slice(0, 10) : '');
    const [courseName, setCourseName] = useState(assignment ? assignment.courseName : '');
    const [estimatedTime, setEstimatedTime] = useState(assignment ? assignment.estimatedTime : '');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ title, description, dueDate, courseName, estimatedTime });
    };

    return (
        <form className="new-assignment" onSubmit={handleSubmit}>
            <h3>{assignment ? 'Edit Assignment' : 'Add a New Assignment'}</h3>
            <label>Assignment Title:</label>
            <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description:</label>
            <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>Due Date:</label>
            <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <label>Course Name:</label>
            <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
            />
            <label>Estimated Time:</label>
            <input
                type="number"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
            />
            <button type="submit">{assignment ? 'Update Assignment' : 'Add Assignment'}</button>
            {onCancel && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default AssignmentForm;