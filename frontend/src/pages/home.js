import { useState, useEffect } from 'react';
import { useAssignmentContext } from '../hooks/useAssignmentContext';
import AssignmentInfo from '../components/AssignmentInfo';
import NewAssignmentForm from '../components/NewAssignmentForm';
import EditAssignmentForm from '../components/EditAssignmentForm';
import StatsModel from '../components/StatsModel';

const Home = () => {
    const { assignments, dispatch } = useAssignmentContext();
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [courseNames, setCourseNames] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showStats, setShowStats] = useState(false);

    // Stats calculations
    const calculateStats = () => {
        if (!assignments || assignments.length === 0) {
            return { average: 0, total: 0, count: 0 };
        }
        
        const total = assignments.reduce((sum, assignment) => 
            sum + Number(assignment.estimatedTime), 0);
        const average = total / assignments.length;
        
        return {
            average: average.toFixed(2),
            total: total.toFixed(2),
            count: assignments.length
        };
    };

    // Fetch course names whenever assignments change
    useEffect(() => {
        const fetchCourseNames = async () => {
            const response = await fetch('/api/assignments/course-names');
            const data = await response.json();
            if (response.ok) {
                setCourseNames(data);
            }
        };
        
        fetchCourseNames();
    }, [assignments]); // Depend on assignments to refresh course names when assignments change

    useEffect(() => {
        // Fetch assignments, filtered by course if one is selected
        const fetchAssignments = async () => {
            let url = '/api/assignments';
            if (selectedCourse) {
                url += `?courseName=${encodeURIComponent(selectedCourse)}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (response.ok) {
                dispatch({ type: 'SET_ASSIGNMENTS', payload: data });
            }
        };
        
        fetchAssignments();
    }, [dispatch, selectedCourse]);

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    // Handle showing the stats model
    const handleShowStats = () => {
        setShowStats(true);
    };

    // Handle closing the stats model
    const handleCloseStats = () => {
        setShowStats(false);
    };

    return (
        <div className="home">
            <div className="assignments">
                <div className="filter-container">
                    <h2>All Assignments</h2>
                    <div className="course-filter">
                        <label htmlFor="course-select">Filter by Course:</label>
                        <select 
                            id="course-select"
                            value={selectedCourse} 
                            onChange={handleCourseChange}
                        >
                            <option value="">All Courses</option>
                            {courseNames.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                        <button 
                            className="stats-button" 
                            onClick={handleShowStats}
                        >
                            View Stats
                        </button>
                    </div>
                </div>
                
                {/* Stats Model */}
                {showStats && (
                    <StatsModel 
                        stats={calculateStats()} 
                        onClose={handleCloseStats}
                        courseName={selectedCourse || "All Courses"}
                    />
                )}
                
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