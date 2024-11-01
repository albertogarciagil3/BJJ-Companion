import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ classifications, positions, setSelectedView, onPositionClick }) => {
    const [isTechniquesOpen, setIsTechniquesOpen] = useState(false);
    const [isPositionsOpen, setIsPositionsOpen] = useState(false);
    const [expandedClassifications, setExpandedClassifications] = useState({});

    const toggleTechniquesMenu = () => {
        setIsTechniquesOpen(!isTechniquesOpen);
    };

    const togglePositionsMenu = () => {
        setIsPositionsOpen(!isPositionsOpen);
    };

    const toggleClassification = (classificationId) => {
        setExpandedClassifications((prev) => ({
            ...prev,
            [classificationId]: !prev[classificationId],
        }));
    };

    return (
        <div className="sidebar">
            {/* Techniques Button */}
            <div className="menu-item">
                <span onClick={toggleTechniquesMenu} className="toggle-arrow">
                    {isTechniquesOpen ? '▼' : '▶'}
                </span>
                <button className="MainButtons" onClick={() => setSelectedView('Techniques')}>
                    Techniques
                </button>
            </div>

            {/* Positions Menu */}
            <div className="menu-item">
                <span onClick={togglePositionsMenu} className="toggle-arrow">
                    {isPositionsOpen ? '▼' : '▶'}
                </span>
                <button className="MainButtons" onClick={() => setSelectedView('Positions')}>
                    Positions
                </button>
            </div>

            {isPositionsOpen && (
                <div className="submenu">
                    {classifications.map((classification) => (
                        <div key={classification._id} className="classification-item">
                            <span
                                onClick={() => toggleClassification(classification._id)}
                                className="toggle-arrow"
                            >
                                {expandedClassifications[classification._id] ? '▼' : '▶'}
                            </span>
                            <button
                                className="classification-name"
                                onClick={() => console.log(`Selected ${classification.name}`)}
                            >
                                {classification.name}
                            </button>
                            {expandedClassifications[classification._id] && (
                                <div className="position-list">
                                    {positions
                                        .filter((position) =>
                                            position.classifications.includes(classification._id)
                                        )
                                        .map((position) => (
                                            <div
                                                key={position._id}
                                                className="position-item"
                                                onClick={() => onPositionClick(position._id)}
                                            >
                                                {position.name}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
