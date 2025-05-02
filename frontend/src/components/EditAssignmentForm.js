import { useAssignmentContext } from '../hooks/useAssignmentContext';
import AssignmentForm from './AssignmentForm';
import { useState } from 'react';

const EditAssignmentForm = ({ assignment, onCancel }) => {
    const { dispatch } = useAssignmentContext();
    const [error, setError] = useState(null);

    const handleSubmit = async (assignmentData) => {
        try {
            const response = await fetch(`/api/assignments/${assignment._id}`, {
                method: 'PATCH',
                body: JSON.stringify(assignmentData),
                headers: { 'Content-Type': 'application/json' },
            });
            
            const json = await response.json();
            
            if (response.ok) {
                console.log('Updated assignment:', json);

                const updatedAssignment = { 
                    ...json,
                    _id: assignment._id 
                };
                
                // Dispatch update action with the full updated assignment
                dispatch({ type: 'UPDATE_ASSIGNMENT', payload: updatedAssignment });
                onCancel();
            } else {
                setError(json.error || 'Failed to update assignment');
                console.error('Update failed:', json.error);
            }
        } catch (err) {
            setError('Failed to connect to server');
            console.error('Error:', err);
        }
    };

    return (
        <>
            <AssignmentForm 
                assignment={assignment} 
                onSubmit={handleSubmit} 
                onCancel={onCancel} 
            />
            {error && <div className="error">{error}</div>}
        </>
    );
};

export default EditAssignmentForm;