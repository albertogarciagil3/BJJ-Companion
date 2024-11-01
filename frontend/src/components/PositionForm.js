import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DualityForm from './DualityForm';
import IfEscenarioForm from './IfEscenarioForm';

const PositionForm = ({ addPosition }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [classification, setClassification] = useState('Nuevas Posiciones');
    const [parentPosition, setParentPosition] = useState('');
    const [duality, setDuality] = useState('');  // Cambiado para almacenar el ObjectId de la dualidad
    const [scenariosIf, setScenariosIf] = useState([]);
    const [media, setMedia] = useState('');
    const [proficiencyLevel, setProficiencyLevel] = useState(1);
    const [giNoGi, setGiNoGi] = useState('both');
    const [entries, setEntries] = useState('');
    const [customFields, setCustomFields] = useState('{}');
    const [classificationsList, setClassificationsList] = useState([]);
    const [parentPositionsList, setParentPositionsList] = useState([]);
    const [dualitiesList, setDualitiesList] = useState([]);
    const [ifsList, setIfsList] = useState([]);
    const [showDualityModal, setShowDualityModal] = useState(false);
    const [showIfModal, setShowIfModal] = useState(false);

    // Fetch classifications, positions, dualities, and IFs from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const classificationsResponse = await axios.get('http://localhost:5000/clasificaciones');
                setClassificationsList(classificationsResponse.data);

                const positionsResponse = await axios.get('http://localhost:5000/positions');
                setParentPositionsList(positionsResponse.data);

                const dualitiesResponse = await axios.get('http://localhost:5000/dualities');
                setDualitiesList(dualitiesResponse.data);

                const ifsResponse = await axios.get('http://localhost:5000/ifescenarios');
                setIfsList(ifsResponse.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('El campo de nombre es requerido');
            return;
        }

        // Aquí se envía el ObjectId de la dualidad seleccionada
        const newPosition = {
            name,
            description,
            classifications: [classification],
            parentPosition: parentPosition || null,
            duality,  // Solo envía el ObjectId de la dualidad seleccionada
            scenariosIf,
            media,
            proficiencyLevel,
            giNoGi,
            entries: entries ? entries.split(',').map((entry) => entry.trim()) : [],
            customFields: customFields !== '' ? JSON.parse(customFields) : {},
        };

        try {
            await addPosition(newPosition);
            // Limpiar los campos del formulario después de enviar
            setName('');
            setDescription('');
            setClassification('Nuevas Posiciones');
            setParentPosition('');
            setDuality(''); // Resetea el ObjectId seleccionado
            setScenariosIf([]);
            setMedia('');
            setProficiencyLevel(1);
            setGiNoGi('both');
            setEntries('');
            setCustomFields('{}');
        } catch (error) {
            console.error('Error al agregar la posición:', error);
        }
    };

    const handleAddDuality = async (newDuality) => {
        try {
            const response = await axios.post('http://localhost:5000/dualities', newDuality);
            setDualitiesList([...dualitiesList, response.data]);
            setShowDualityModal(false); // Close the modal after creation
        } catch (error) {
            console.error('Error al agregar la dualidad:', error);
        }
    };

    const handleAddIfEscenario = async (newIfEscenario) => {
        try {
            const response = await axios.post('http://localhost:5000/ifescenarios', newIfEscenario);
            setIfsList([...ifsList, response.data]);
            setShowIfModal(false); // Close the modal after creation
        } catch (error) {
            console.error('Error al agregar el escenario IF:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <label style={styles.label}>Nombre de la Posición (texto):</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.inputField}
                />

                <label style={styles.label}>Descripción (texto):</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.textArea}
                />

                <label style={styles.label}>Clasificación:</label>
                <select
                    value={classification}
                    onChange={(e) => setClassification(e.target.value)}
                    style={styles.selectField}
                >
                    <option value="Nuevas Posiciones">Nuevas Posiciones</option>
                    {classificationsList.map((classification) => (
                        <option key={classification._id} value={classification._id}>
                            {classification.name}
                        </option>
                    ))}
                </select>

                <label style={styles.label}>Posición Padre (opcional):</label>
                <select
                    value={parentPosition}
                    onChange={(e) => setParentPosition(e.target.value)}
                    style={styles.selectField}
                >
                    <option value="">Seleccionar Posición Padre</option>
                    {parentPositionsList.map((position) => (
                        <option key={position._id} value={position._id}>
                            {position.name}
                        </option>
                    ))}
                </select>

                <label style={styles.label}>Dualidad:</label>
                <select
                    value={duality}
                    onChange={(e) => setDuality(e.target.value)} // Aquí solo el ObjectId se almacena
                    style={styles.selectField}
                >
                    <option value="">Seleccionar Dualidad</option>
                    {dualitiesList.map((duality) => (
                        <option key={duality._id} value={duality._id}>
                            {duality.name}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => setShowDualityModal(true)} style={styles.addButton}>
                    Crear Nueva Dualidad
                </button>

                <label style={styles.label}>Escenarios IF:</label>
                <select
                    multiple
                    value={scenariosIf}
                    onChange={(e) => setScenariosIf([...e.target.selectedOptions].map((option) => option.value))}
                    style={styles.selectField}
                >
                    {ifsList.map((ifEscenario) => (
                        <option key={ifEscenario._id} value={ifEscenario._id}>
                            {ifEscenario.description}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => setShowIfModal(true)} style={styles.addButton}>
                    Crear Nuevo IF
                </button>

                <label style={styles.label}>Media (URLs separadas por comas):</label>
                <input
                    type="text"
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                    style={styles.inputField}
                />

                <label style={styles.label}>Proficiency Level (número del 1 al 10):</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={proficiencyLevel}
                    onChange={(e) => setProficiencyLevel(Number(e.target.value))}
                    style={styles.inputField}
                />

                <label style={styles.label}>Gi/No Gi:</label>
                <select value={giNoGi} onChange={(e) => setGiNoGi(e.target.value)} style={styles.selectField}>
                    <option value="gi">Gi</option>
                    <option value="nogi">No Gi</option>
                    <option value="both">Ambos</option>
                </select>

                <label style={styles.label}>Entries (IDs de técnicas separadas por comas):</label>
                <input
                    type="text"
                    value={entries}
                    onChange={(e) => setEntries(e.target.value)}
                    style={styles.inputField}
                />

                <label style={styles.label}>Campos Personalizados (JSON):</label>
                <textarea
                    value={customFields}
                    onChange={(e) => setCustomFields(e.target.value)}
                    style={styles.textArea}
                    placeholder='{"campo1": "valor1", "campo2": "valor2"}'
                />

                <button type="submit" style={styles.submitButton}>
                    Añadir Posición
                </button>
            </form>

            {/* Modal for adding Duality */}
            {showDualityModal && (
                <div style={styles.modal}>
                    <DualityForm addDuality={handleAddDuality} />
                    <button onClick={() => setShowDualityModal(false)} style={styles.closeModalButton}>
                        Cerrar
                    </button>
                </div>
            )}

            {/* Modal for adding IF */}
            {showIfModal && (
                <div style={styles.modal}>
                    <IfEscenarioForm addIfEscenario={handleAddIfEscenario} />
                    <button onClick={() => setShowIfModal(false)} style={styles.closeModalButton}>
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        marginLeft: '0',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    label: {
        marginBottom: '0.3rem',
        fontWeight: 'bold',
    },
    inputField: {
        marginBottom: '1rem',
        padding: '0.5rem',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    textArea: {
        marginBottom: '1rem',
        padding: '0.5rem',
        height: '100px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    selectField: {
        marginBottom: '1rem',
        padding: '0.5rem',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    addButton: {
        marginBottom: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    submitButton: {
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        zIndex: 1000,
    },
    closeModalButton: {
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default PositionForm;
