import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TechniqueTypeForm from './TechniqueTypeForm'; // Formulario modular para agregar un nuevo tipo de técnica
import PositionForm from './PositionForm'; // Formulario modular para crear una nueva posición
import IfEscenarioForm from './IfEscenarioForm'; // Formulario modular para crear un nuevo IF

const TechniqueForm = ({ addTechnique }) => {
    const [name, setName] = useState('');
    const [techniqueType, setTechniqueType] = useState('');
    const [positionStart, setPositionStart] = useState('');
    const [temporalPositions, setTemporalPositions] = useState([]);
    const [endPosition, setEndPosition] = useState('');
    const [ifScenarios, setIfScenarios] = useState('');
    const [media, setMedia] = useState('');
    const [externalLinks, setExternalLinks] = useState('');
    const [relatedPositions, setRelatedPositions] = useState([]); // Inicializado como array
    const [relatedTechniques, setRelatedTechniques] = useState('');
    const [proficiencyLevel, setProficiencyLevel] = useState(1);
    const [giNoGi, setGiNoGi] = useState('both');
    const [practiceToday, setPracticeToday] = useState(false);
    const [positionsList, setPositionsList] = useState([]);
    const [techniquesList, setTechniquesList] = useState([]);
    const [techniqueTypesList, setTechniqueTypesList] = useState([]);
    const [ifsList, setIfsList] = useState([]);
    const [customFields, setCustomFields] = useState({});
    const [showTechniqueTypeForm, setShowTechniqueTypeForm] = useState(false);
    const [showPositionForm, setShowPositionForm] = useState(false);
    const [showIfForm, setShowIfForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [positionsResponse, techniquesResponse, typesResponse, ifsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/positions'),
                    axios.get('http://localhost:5000/techniques'),
                    axios.get('http://localhost:5000/techniquetypes'),
                    axios.get('http://localhost:5000/ifescenarios')
                ]);
                setPositionsList(positionsResponse.data);
                setTechniquesList(techniquesResponse.data);
                setTechniqueTypesList(typesResponse.data);
                setIfsList(ifsResponse.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleAddTemporalPosition = () => {
        setTemporalPositions([...temporalPositions, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const techniqueData = {
            name,
            techniqueType,
            positionStart,
            temporalPositions,
            endPosition,
            ifScenarios,
            media: media.split(',').map((m) => m.trim()),
            externalLinks: externalLinks.split(',').map((link) => link.trim()),
            relatedPositions,
            relatedTechniques,
            proficiencyLevel,
            giNoGi,
            practiceToday,
            customFields,
        };
        addTechnique(techniqueData)
            .then(() => {
                setName('');
                setTechniqueType('');
                setPositionStart('');
                setTemporalPositions([]);
                setEndPosition('');
                setIfScenarios('');
                setMedia('');
                setExternalLinks('');
                setRelatedPositions([]);
                setRelatedTechniques('');
                setProficiencyLevel(1);
                setGiNoGi('both');
                setPracticeToday(false);
                setCustomFields({});
            })
            .catch((error) => {
                console.error('Error al agregar la técnica:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            <label style={styles.label}>Nombre de la Técnica:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.inputField}
            />

            <label style={styles.label}>Tipo de Técnica:</label>
            <select
                value={techniqueType}
                onChange={(e) => setTechniqueType(e.target.value)}
                required
                style={styles.selectField}
            >
                <option value="">Seleccionar Tipo de Técnica</option>
                {techniqueTypesList.map((type) => (
                    <option key={type._id} value={type._id}>
                        {type.name}
                    </option>
                ))}
            </select>
            <button type="button" onClick={() => setShowTechniqueTypeForm(true)} style={styles.addButton}>
                Crear Nuevo Tipo de Técnica
            </button>

            <label style={styles.label}>Posiciones Relacionadas:</label>
            <select
                multiple
                value={relatedPositions}
                onChange={(e) =>
                    setRelatedPositions(Array.from(e.target.selectedOptions, (option) => option.value))
                }
                style={styles.selectField}
            >
                {positionsList.map((position) => (
                    <option key={position._id} value={position._id}>
                        {position.name}
                    </option>
                ))}
            </select>

            <label style={styles.label}>Posición desde la que se ejecuta:</label>
            <select
                value={positionStart}
                onChange={(e) => setPositionStart(e.target.value)}
                required
                style={styles.selectField}
            >
                <option value="">Seleccionar Posición</option>
                {positionsList.map((position) => (
                    <option key={position._id} value={position._id}>
                        {position.name}
                    </option>
                ))}
            </select>
            <button type="button" onClick={() => setShowPositionForm(true)} style={styles.addButton}>
                Crear Nueva Posición
            </button>

            <label style={styles.label}>Posiciones Intermedias:</label>
            {temporalPositions.map((_, index) => (
                <select
                    key={index}
                    value={temporalPositions[index]}
                    onChange={(e) => {
                        const newTemporalPositions = [...temporalPositions];
                        newTemporalPositions[index] = e.target.value;
                        setTemporalPositions(newTemporalPositions);
                    }}
                    style={styles.selectField}
                >
                    <option value="">Seleccionar Posición</option>
                    {positionsList.map((position) => (
                        <option key={position._id} value={position._id}>
                            {position.name}
                        </option>
                    ))}
                </select>
            ))}
            <button type="button" onClick={handleAddTemporalPosition} style={styles.addButton}>
                Agregar Posición Intermedia
            </button>

            <label style={styles.label}>Posición Final:</label>
            <select
                value={endPosition}
                onChange={(e) => setEndPosition(e.target.value)}
                required
                style={styles.selectField}
            >
                <option value="">Seleccionar Posición Final</option>
                {positionsList.map((position) => (
                    <option key={position._id} value={position._id}>
                        {position.name}
                    </option>
                ))}
            </select>
            <button type="button" onClick={() => setShowPositionForm(true)} style={styles.addButton}>
                Crear Nueva Posición
            </button>

            <label style={styles.label}>Parte de un IF:</label>
            <select
                value={ifScenarios}
                onChange={(e) => setIfScenarios(e.target.value)}
                style={styles.selectField}
            >
                <option value="">Seleccionar IF</option>
                {ifsList.map((ifEscenario) => (
                    <option key={ifEscenario._id} value={ifEscenario._id}>
                        {ifEscenario.description}
                    </option>
                ))}
            </select>
            <button type="button" onClick={() => setShowIfForm(true)} style={styles.addButton}>
                Crear Nuevo IF
            </button>

            <button type="submit" style={styles.submitButton}>Añadir Técnica</button>

            {showTechniqueTypeForm && <TechniqueTypeForm onClose={() => setShowTechniqueTypeForm(false)} />}
            {showPositionForm && <PositionForm onClose={() => setShowPositionForm(false)} />}
            {showIfForm && <IfEscenarioForm onClose={() => setShowIfForm(false)} />}
        </form>
    );
};

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
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
};

export default TechniqueForm;
