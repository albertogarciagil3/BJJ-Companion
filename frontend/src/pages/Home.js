import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ActionBar from '../components/ActionBar';
import PositionTable from '../components/Position';
import TechniqueTable from '../components/TechniqueTable';
import ClassificationForm from '../components/ClassificationForm';
import PositionForm from '../components/PositionForm';
import TechniqueForm from '../components/TechniqueForm';
import DualityForm from '../components/DualityForm';
import IfEscenarioForm from '../components/IfEscenarioForm';
import {
    getClassifications,
    getPositions,
    getTechniques,
    getDualities,
    getIfEscenarios,
    getTechniqueTypes,
    createPosition,
    createTechnique,
    createClassification,
    createDuality,
    createIfEscenario,
    updatePosition,
    updateTechnique,
    deletePosition,
    deleteTechnique,
} from '../services/api';
import './Home.css';

const Home = () => {
    const [selectedView, setSelectedView] = useState('Techniques');
    const [showAddOptions, setShowAddOptions] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [positions, setPositions] = useState([]);
    const [techniques, setTechniques] = useState([]);
    const [classifications, setClassifications] = useState([]);
    const [dualities, setDualities] = useState([]);
    const [ifs, setIfs] = useState([]);
    const [techniqueTypes, setTechniqueTypes] = useState([]);
    const [filteredTechniques, setFilteredTechniques] = useState([]);
    const [selectedPositionId, setSelectedPositionId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [
                fetchedPositions,
                fetchedTechniques,
                fetchedClassifications,
                fetchedDualities,
                fetchedIfEscenarios,
                fetchedTechniqueTypes,
            ] = await Promise.all([
                getPositions(),
                getTechniques(),
                getClassifications(),
                getDualities(),
                getIfEscenarios(),
                getTechniqueTypes(),
            ]);

            setPositions(fetchedPositions || []);
            setTechniques(fetchedTechniques || []);
            setClassifications(fetchedClassifications || []);
            setDualities(fetchedDualities || []);
            setIfs(fetchedIfEscenarios || []);
            setTechniqueTypes(fetchedTechniqueTypes || []);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTechnique = async (data) => {
        console.log("handleAddTechnique ejecutado"); // <--- Agrega esto para verificar
        try {
            await createTechnique(data); // Crea la técnica en la base de datos.
            const updatedTechniques = await getTechniques(); // Obtiene las técnicas actualizadas.
            setTechniques(updatedTechniques); // Actualiza todas las técnicas.

            // Si estás en la vista de técnicas filtradas, actualiza la lista visible.
            if (
                selectedView === 'FilteredTechniques' &&
                data.positionStart === selectedPositionId
            ) {
                const filtered = updatedTechniques.filter(
                    (technique) => technique.positionStart === selectedPositionId
                );
                setFilteredTechniques(filtered); // Actualiza las técnicas filtradas.
            }
        } catch (error) {
            console.error('Error al agregar técnica:', error);
        }
    };

    const handleAdd = (type) => {
        switch (type) {
            case 'Position':
                setModalContent(
                    <PositionForm addPosition={(data) => createPosition(data).then(fetchData)} />
                );
                break;
            case 'Technique':
                setModalContent(
                    <TechniqueForm addTechnique={handleAddTechnique} />
                );
                break;
            case 'Classification':
                setModalContent(
                    <ClassificationForm
                        addClassification={(data) => createClassification(data).then(fetchData)}
                    />
                );
                break;
            case 'Duality':
                setModalContent(
                    <DualityForm addDuality={(data) => createDuality(data).then(fetchData)} />
                );
                break;
            case 'IfEscenario':
                setModalContent(
                    <IfEscenarioForm
                        addIfEscenario={(data) => createIfEscenario(data).then(fetchData)}
                    />
                );
                break;
            default:
                setModalContent(null);
        }
    };

    const handlePositionClick = (positionId) => {
        setSelectedPositionId(positionId);
        const filtered = techniques.filter(
            (technique) => technique.positionStart === positionId
        );
        setFilteredTechniques(filtered);
        setSelectedView('FilteredTechniques');
    };

    const renderView = () => {
        switch (selectedView) {
            case 'Techniques':
                return (
                    <TechniqueTable
                        techniques={techniques}
                        updateTechnique={(data) => updateTechnique(data).then(fetchData)}
                        deleteTechnique={(id) => deleteTechnique(id).then(fetchData)}
                    />
                );
            case 'FilteredTechniques':
                return (
                    <TechniqueTable
                        techniques={filteredTechniques}
                        updateTechnique={(data) => updateTechnique(data).then(fetchData)}
                        deleteTechnique={(id) => deleteTechnique(id).then(fetchData)}
                    />
                );
            case 'Positions':
                return (
                    <PositionTable
                        positions={positions}
                        updatePosition={(data) => updatePosition(data).then(fetchData)}
                        deletePosition={(id) => deletePosition(id).then(fetchData)}
                    />
                );
            default:
                return <p>Selecciona una opción del menú</p>;
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <div className="profile-section">
                    <span className="username">BJJ Companion</span>
                </div>
            </div>

            <div className="main-content">
                <div className="sidebar-container">
                    <ActionBar
                        showAddOptions={showAddOptions}
                        setShowAddOptions={setShowAddOptions}
                        handleAdd={handleAdd}
                    />
                    <Sidebar
                        classifications={classifications}
                        positions={positions}
                        setSelectedView={setSelectedView}
                        onPositionClick={handlePositionClick}
                    />
                </div>

                <section className="content-area">{renderView()}</section>
            </div>

            {modalContent && (
                <>
                    <div className="modal-overlay" onClick={() => setModalContent(null)}></div>
                    <div className="modal">
                        {modalContent}
                        <button onClick={() => setModalContent(null)} className="close-btn">
                            Cerrar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
