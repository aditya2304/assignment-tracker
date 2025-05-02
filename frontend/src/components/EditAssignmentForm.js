import { useAssignmentContext } from '../hooks/useAssignmentContext';
import AssignmentForm from './AssignmentForm';

const EditAssignmentForm = ({ assignment, onCancel }) => {
    const { dispatch } = useAssignmentContext();

    const handleSubmit = async (assignmentData) => {
        const response = await fetch(`/api/assignments/${assignment._id}`, {
            method: 'PATCH',
            body: JSON.stringify(assignmentData),
            headers: { 'Content-Type': 'application/json' },
        });
        
        const json = await response.json();

        if (response.ok) {
            window.location.reload()
            //dispatch({ type: 'UPDATE_ASSIGNMENT', payload: json });
            onCancel();
        } else {
            
        }
    };

    return <AssignmentForm assignment={assignment} onSubmit={handleSubmit} onCancel={onCancel} />;
};

export default EditAssignmentForm;