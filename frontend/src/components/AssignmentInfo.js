import { useAssignmentContext } from "../hooks/useAssignmentContext";

const AssignmentInfo = ({ assignment, onEdit }) => {
    const { dispatch } = useAssignmentContext();

    const remove = async () => {
        const response = await fetch('/api/assignments/' + assignment._id, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_ASSIGNMENT', payload: json });
        }
    }

    const edit = () => {
        onEdit(); // Trigger the edit mode in the Home component
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Add timezone offset to prevent date shift
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return utcDate.toLocaleDateString();
    };

    return (
        <div className="assignment-info">
            <h4>{assignment.title}</h4>
            <p><strong>Description: </strong>{assignment.description}</p>
            <p><strong>Due Date: </strong> {formatDate(assignment.dueDate)}</p>
            <p><strong>Course Name: </strong> {assignment.courseName}</p>
            <p><strong>Estimated Time: </strong> {assignment.estimatedTime} hours</p>
            <span onClick={remove}>delete</span>
            <span class="edit" onClick={edit}>edit</span>
        </div>
    )
}

export default AssignmentInfo;