import { createContext, useReducer } from "react";

export const AssignmentContext = createContext();

// Helper function to sort assignments by due date (ascending)
const sortAssignments = (assignments) => {
    if (!assignments) return [];
    return [...assignments].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

export const assignmentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ASSIGNMENTS':
            // Ensure initial set is also sorted
            return {
                assignments: sortAssignments(action.payload)
            }
        case 'CREATE_ASSIGNMENT':
            // Add the new assignment and re-sort
            const newAssignments = [...(state.assignments || []), action.payload];
            return {
                assignments: sortAssignments(newAssignments)
            }
        case 'DELETE_ASSIGNMENT':
            // Filter out the deleted assignment (order is maintained)
            return {
                assignments: state.assignments.filter((a) => a._id !== action.payload._id)
            }
        case 'UPDATE_ASSIGNMENT':
            // Find the index and replace, then re-sort
            const updatedAssignments = state.assignments.map(assignment => 
                assignment._id === action.payload._id ? action.payload : assignment
            );
            return {
                assignments: sortAssignments(updatedAssignments)
            }
        default:
            return state
    }
}

export const AssignmentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(assignmentReducer, {
        assignments: null
    })

    return (
        <AssignmentContext.Provider value={{...state, dispatch}}>
            { children }
        </AssignmentContext.Provider>
    )
}