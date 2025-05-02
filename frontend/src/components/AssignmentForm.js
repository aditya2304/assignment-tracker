// AssignmentForm.js
import { useState, useEffect } from 'react';

const AssignmentForm = ({ assignment, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(assignment ? assignment.title : '');
    const [description, setDescription] = useState(assignment ? assignment.description : '');
    const [dueDate, setDueDate] = useState('');
    const [courseName, setCourseName] = useState(assignment ? assignment.courseName : '');
    const [estimatedTime, setEstimatedTime] = useState(assignment ? assignment.estimatedTime : '');
    const [error, setError] = useState(null);


    useEffect(() => {
        if (assignment && assignment.dueDate) {
            // Convert to local date format without time info
            const date = new Date(assignment.dueDate);
            const offset = date.getTimezoneOffset();
            const adjustedDate = new Date(date.getTime() + offset * 60000);
            setDueDate(adjustedDate.toISOString().split('T')[0]);
        }
    }, [assignment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let submittedDate = dueDate;
        if (dueDate) {
            // Ensure consistent timezone handling by setting the time portion
            const date = new Date(dueDate + 'T12:00:00');
            submittedDate = date.toISOString();
        }
        
        // Call the onSubmit prop, which handles the actual API call
        const success = await onSubmit({ 
            title, 
            description, 
            dueDate: submittedDate, 
            courseName, 
            estimatedTime 
        });

        // If submission was successful and it's the 'Add' form (not editing), clear fields
        if (success && !assignment) {
            handleClear();
        }
    };
    
    // Clear function for resetting form fields
    const handleClear = () => {
        setTitle('');
        setDescription('');
        setDueDate('');
        setCourseName('');
        setEstimatedTime('');
        setError(null);
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
            <label>Estimated Time (hours):</label>
            <input
                type="number"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
            />
            <div className="form-buttons">
                <button type="submit">{assignment ? 'Update Assignment' : 'Add Assignment'}</button>
                
                {!assignment && (
                    <button type="button" onClick={handleClear}>Clear</button>
                )}
                
                {onCancel && (
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default AssignmentForm;