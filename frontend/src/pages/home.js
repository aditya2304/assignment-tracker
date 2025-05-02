import { useState, useEffect } from 'react';
import { useAssignmentContext } from '../hooks/useAssignmentContext';
import AssignmentInfo from '../components/AssignmentInfo';
import NewAssignmentForm from '../components/NewAssignmentForm';
import EditAssignmentForm from '../components/EditAssignmentForm';

const Home = () => {
    const { assignments, dispatch } = useAssignmentContext();
    const [editingAssignment, setEditingAssignment] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await fetch('/api/assignments');
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_ASSIGNMENTS', payload: data });
            }
        };
        fetchAssignments();
    }, [dispatch]);

    return (
        <div className="home">
            <div className="assignments">
                <h2>All Assignments</h2>
                {assignments &&
                    assignments.map((assignment) => (
                        <AssignmentInfo
                            key={assignment._id}
                            assignment={assignment}
                            onEdit={() => setEditingAssignment(assignment)}
                        />
                    ))}
            </div>
            {editingAssignment ? (
                <EditAssignmentForm
                    assignment={editingAssignment}
                    onCancel={() => setEditingAssignment(null)}
                />
            ) : (
                <NewAssignmentForm />
            )}
        </div>
    );
};

export default Home;