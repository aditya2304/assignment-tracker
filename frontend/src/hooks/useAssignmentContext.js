import { AssignmentContext } from "../context/AssignmentContext";
import { useContext } from "react";

export const useAssignmentContext = () => {
    const context = useContext(AssignmentContext);

    if (!context) {
        throw Error('useAssignmentContext must be used inside an AssignmentProvider');
    }

    return context;
}