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
        } else {
            // Handle error if needed
        }
    };

    return <AssignmentForm onSubmit={handleSubmit} />;
};

export default NewAssignmentForm;