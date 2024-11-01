import React from 'react';
import './ActionBar.css';

const ActionBar = ({ showAddOptions, setShowAddOptions, handleAdd }) => {
    return (
        <div className="action-bar">
            <button className="action-btn" onClick={() => handleAdd('Home')}>
                Home
            </button>
            <button className="action-btn" onClick={() => handleAdd('PorDefinir')}>
                Por definir
            </button>
            <button
                className="action-btn"
                onClick={() => setShowAddOptions(!showAddOptions)}
            >
                Add
            </button>

            {showAddOptions && (
                <div className="add-options">
                    <button onClick={() => handleAdd('Technique')}>Add Technique</button>
                    <button onClick={() => handleAdd('Position')}>Add Position</button>
                    <button onClick={() => handleAdd('Classification')}>
                        Add Classification
                    </button>
                    <button onClick={() => handleAdd('Duality')}>Add Duality</button>
                    <button onClick={() => handleAdd('IfEscenario')}>
                        Add IF Scenario
                    </button>
                </div>
            )}

            <button className="action-btn" onClick={() => handleAdd('Upload')}>
                Subir Videos
            </button>
            <button className="action-btn" onClick={() => handleAdd('Another')}>
                Por definir
            </button>
        </div>
    );
};

export default ActionBar;
