import React from 'react';
import '../styles/StatsModal.css';

const StatsModal = ({ stats, onClose, courseName }) => {
    return (
        <div className="stats-modal-backdrop">
            <div className="stats-modal">
                <div className="stats-header">
                    <h2>Assignment Statistics</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="stats-content">
                    <h3>{courseName}</h3>
                    <div className="stats-data">
                        <div className="stat-item">
                            <p className="stat-label">Total Assignments:</p>
                            <p className="stat-value">{stats.count}</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-label">Average Estimated Time:</p>
                            <p className="stat-value">{stats.average} hours</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-label">Total Estimated Time:</p>
                            <p className="stat-value">{stats.total} hours</p>
                        </div>
                    </div>
                </div>
                
                <div className="stats-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default StatsModal;
