import { createContext, useReducer } from "react";

export const AssignmentContext = createContext();
export const assignmentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ASSIGNMENTS':
            return {
                assignments: action.payload
            }
        case 'CREATE_ASSIGNMENT':
            return {
                assignments: [action.payload, ...state.assignments]
            }
        case 'DELETE_ASSIGNMENT':
            return {
                assignments: state.assignments.filter((a) => a._id !== action.payload._id)
            }
        case 'UPDATE_ASSIGNMENT':
            // First remove the old assignment, then add the updated one
            const filteredAssignments = state.assignments.filter(
                a => a._id !== action.payload._id
            );
            
            return {
                assignments: [action.payload, ...filteredAssignments]
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