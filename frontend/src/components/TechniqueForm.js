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
    const [relatedPositions, setRelatedPositions] = useState([]);
    const [relatedTechniques, setRelatedTechniques] = useState('');
    const [proficiencyLevel, setProficiencyLevel] = useState(1);
    const [giNoGi, setGiNoGi] = useState('both');
    const [practiceToday, setPracticeToday] = useState(false);
    const [positionsList, setPositionsList] = useState([]);
    const [techniquesList, setTechniquesList] = useState([]);
    const [techniqueTypesList, setTechniqueTypesList] = useState([]);
    const [ifsList, setIfsList] = useState([]);
    const [TechniqueCustomFields, setTechniqueCustomFields] = useState([]);
    const [customFieldValues, setCustomFieldValues] = useState({});
    const [showTechniqueTypeForm, setShowTechniqueTypeForm] = useState(false);
    const [showPositionForm, setShowPositionForm] = useState(false);
    const [showIfForm, setShowIfForm] = useState(false);
    const [showCustomFields, setShowCustomFields] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    positionsResponse,
                    techniquesResponse,
                    typesResponse,
                    ifsResponse,
                    CustomFieldsResponse
                ] = await Promise.all([
                    axios.get('http://localhost:5000/positions'),
                    axios.get('http://localhost:5000/techniques'),
                    axios.get('http://localhost:5000/techniquetypes'),
                    axios.get('http://localhost:5000/ifescenarios'),
                    axios.get('http://localhost:5000/custom-fields')
                ]);
                setPositionsList(positionsResponse.data);
                setTechniquesList(techniquesResponse.data);
                setTechniqueTypesList(typesResponse.data);
                setIfsList(ifsResponse.data);
                setTechniqueCustomFields(CustomFieldsResponse.data);
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
        console.log("Valores de customFieldValues:", customFieldValues); // Verificar contenido
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
            TechniqueCustomFields: Object.entries(customFieldValues).map(([fieldId, value]) => ({
                field: fieldId,
                value: value,
            })),
        };

        console.log("Datos enviados al backend:", techniqueData); // <-- Verifica aquí
        addTechnique(techniqueData)
        
            .then(() => {
                console.log("Técnica agregada con éxito");
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
                setCustomFieldValues({});
            })
            .catch((error) => {
                console.error('Error al agregar la técnica:', error);
            });
    };


    const renderCustomFieldInput = (field) => {
        const handleChange = (value) => {
            setCustomFieldValues((prev) => ({
                ...prev,
                [field._id]: value,
            }));
        };

        switch (field.type) {
            case 'Text':
                return (
                    <input
                        type="text"
                        value={customFieldValues[field._id] || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        style={styles.inputField}
                    />
                );
            case 'Number':
                return (
                    <input
                        type="number"
                        value={customFieldValues[field._id] || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        style={styles.inputField}
                    />
                );
            case 'Checklist':
                return (
                    <input
                        type="checkbox"
                        checked={customFieldValues[field._id] || false}
                        onChange={(e) => handleChange(e.target.checked)}
                        style={styles.checkbox}
                    />
                );
            case 'Select':
            case 'Multiselect':
                return (
                    <select
                        multiple={field.type === 'Multiselect'}
                        value={customFieldValues[field._id] || []}
                        onChange={(e) =>
                            handleChange(Array.from(e.target.selectedOptions, (option) => option.value))
                        }
                        style={styles.selectField}
                    >
                        {field.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case 'Date':
                return (
                    <input
                        type="date"
                        value={customFieldValues[field._id] || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        style={styles.inputField}
                    />
                );
            case 'Hyperlink':
                return (
                    <input
                        type="url"
                        value={customFieldValues[field._id] || ''}
                        onChange={(e) => handleChange(e.target.value)}
                        style={styles.inputField}
                    />
                );
            case 'Multimedia':
                return (
                    <input
                        type="file"
                        multiple
                        onChange={(e) => handleChange(Array.from(e.target.files))}
                        style={styles.fileInput}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            {/* Campos básicos de técnica */}
            <label style={styles.label}>Nombre de la Técnica:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.inputField}
            />
            {/* (otros campos del formulario como antes, omitiendo para brevedad) */}

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

            <label style={styles.label}>Campos Personalizados:</label>
            <button type="button" onClick={() => setShowCustomFields(!showCustomFields)} style={styles.toggleButton}>
                {showCustomFields ? 'Ocultar Campos Personalizados' : 'Mostrar Campos Personalizados'}
            </button>
            {showCustomFields && (
                <div style={styles.customFieldsContainer}>
                    {TechniqueCustomFields.map((field) => (
                        <div key={field._id} style={styles.customField}>
                            <label style={styles.label}>{field.name}:</label>
                            {renderCustomFieldInput(field)}
                        </div>
                    ))}
                </div>
            )}

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
    checkbox: {
        marginBottom: '1rem',
    },
    toggleButton: {
        marginBottom: '1rem',
        padding: '0.5rem',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    customFieldsContainer: {
        border: '1px solid #ddd',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem',
    },
    submitButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    fileInput: {
        marginBottom: '1rem',
    },
};

export default TechniqueForm;
