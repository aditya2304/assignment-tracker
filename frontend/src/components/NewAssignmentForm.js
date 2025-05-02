import { useAssignmentContext } from '../hooks/useAssignmentContext';
import AssignmentForm from './AssignmentForm';

const NewAssignmentForm = () => {
    const { dispatch } = useAssignmentContext();

    const handleSubmit = async (assignmentData) => {
        const response = await fetch('/api/assignments', {
            method: 'POST',
            body: JSON.stringify(assignmentData),
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: 'CREATE_ASSIGNMENT', payload: json });
            return true; // Return true to indicate successful submission
        } else {
            // Handle error if needed
            return false; // Return false to indicate failed submission
        }
    };

    return <AssignmentForm onSubmit={handleSubmit} />;
};

export default NewAssignmentForm;