import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import {
    getPositions,
    getTechniqueTypes,
    getTechniques,
    getTechniqueCustomFields,
    addTechniqueCustomField,
    deleteTechniqueCustomField,
    deleteTechnique
} from '../services/api';

const TechniqueTable = ({ updateTechnique }) => {
    const [techniquesState, setTechniquesState] = useState([]);
    const [positions, setPositions] = useState([]);
    const [techniqueTypes, setTechniqueTypes] = useState([]);
    const [customFieldsState, setCustomFieldsState] = useState([]);  // Estado para customFields
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteTechniqueModal, setShowDeleteTechniqueModal] = useState(false);
    const [newFieldType, setNewFieldType] = useState('');
    const [newFieldName, setNewFieldName] = useState('');
    const [fieldToDelete, setFieldToDelete] = useState(null);
    const [techniqueToDelete, setTechniqueToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const techniquesData = await getTechniques();
                console.log("Datos recibidos para techniquesState:", techniquesData); // <-- Agrega este console.log
                setTechniquesState(techniquesData);

                const positionsData = await getPositions();
                setPositions(positionsData);

                const techniqueTypesData = await getTechniqueTypes();
                setTechniqueTypes(techniqueTypesData);

                const customFieldsData = await getTechniqueCustomFields();  // Obtener customFields desde el backend
                setCustomFieldsState(customFieldsData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);


    const getPositionName = (id) => {
        const position = positions.find((pos) => pos._id === id);
        return position ? position.name : 'Sin posición';
    };

    const getTechniqueTypeName = (idArray) => {
        const names = idArray
            .map((id) => {
                const type = techniqueTypes.find((t) => t._id === id);
                return type ? type.name : 'Sin tipo';
            })
            .join(', ');
        return names;
    };

    const columns = useMemo(() => {
        const baseColumns = [
            { id: 'name', accessorKey: 'name', header: 'Nombre' },
            {
                id: 'techniqueType',
                accessorKey: 'techniqueType',
                header: 'Tipo',
                cell: ({ getValue }) => getTechniqueTypeName(getValue()),
            },
            {
                id: 'positionStart',
                accessorKey: 'positionStart',
                header: 'Posición Inicial',
                cell: ({ getValue }) => getPositionName(getValue()),
            },
            {
                id: 'endPosition',
                accessorKey: 'endPosition',
                header: 'Posición Final',
                cell: ({ getValue }) => getPositionName(getValue()),
            },
            { id: 'proficiencyLevel', accessorKey: 'proficiencyLevel', header: 'Proficiency Level' },
            { id: 'giNoGi', accessorKey: 'giNoGi', header: 'Gi/No Gi' },
            {
                id: 'actions',
                header: 'Acciones',
                cell: ({ row }) => (
                    <>
                        <button onClick={() => handleDeleteTechniqueClick(row.original._id)} style={styles.deleteButton}>
                            Eliminar
                        </button>
                    </>
                ),
            },
        ];

        const customFieldColumns = customFieldsState.map((field) => ({
            id: field._id,
            accessorFn: (row) => {
                const customField = row.TechniqueCustomFields.find(cf => {
                    console.log("Comparando:", cf.field._id ? cf.field._id.toString() : cf.field.toString(), "con", field._id.toString());
                    return (cf.field._id ? cf.field._id.toString() : cf.field.toString()) === field._id.toString();
                });
                console.log("Valor encontrado:", customField ? customField.value : 'N/A'); // Muestra el valor encontrado
                return customField ? customField.value : 'N/A';
            },
            header: (
                <div>
                    {field.name}
                    <button onClick={() => handleDeleteFieldClick(field._id)} style={styles.deleteFieldButton}>🗑️</button>
                </div>
            ),
            cell: ({ getValue }) => {
        const value = getValue();
        if (typeof value === 'boolean') {
            return value ? "✔️" : "❌"; // Muestra "✔️" para true y "❌" para false
        }
        return value || ''; // Otros valores o 'N/A' si es null o undefined
    },
        }));






        return [
            ...baseColumns,
            ...customFieldColumns,
            {
                id: 'addNewField',
                header: (
                    <button onClick={() => setShowModal(true)} style={styles.addNewFieldButton}>
                        Add New Field
                    </button>
                ),
                cell: () => null,
            },
        ];
    }, [positions, techniqueTypes, techniquesState, customFieldsState, getPositionName, getTechniqueTypeName]);

    const table = useReactTable({
        data: techniquesState,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });





    const handleAddNewField = async () => {
        try {
            await addTechniqueCustomField(newFieldName, newFieldType);
            setShowModal(false);
            setNewFieldName('');
            setNewFieldType('');
            const updatedCustomFields = await getTechniqueCustomFields();
            setCustomFieldsState(updatedCustomFields); // Actualizar el estado de customFields
        } catch (error) {
            console.error('Error al agregar campo personalizado:', error);
        }
    };

    const handleDeleteFieldClick = (field) => {
        setFieldToDelete(field);
        setShowDeleteModal(true);
    };

    const handleConfirmDeleteField = async () => {
        if (!fieldToDelete) return;
        try {
            await deleteTechniqueCustomField(fieldToDelete);
            setShowDeleteModal(false);
            setFieldToDelete(null);
            const updatedCustomFields = await getTechniqueCustomFields();
            setCustomFieldsState(updatedCustomFields);
        } catch (error) {
            console.error('Error al eliminar campo personalizado:', error);
        }
    };

    const handleDeleteTechniqueClick = (techniqueId) => {
        setTechniqueToDelete(techniqueId);
        setShowDeleteTechniqueModal(true);
    };

    const handleConfirmDeleteTechnique = async () => {
        try {
            await deleteTechnique(techniqueToDelete);
            setShowDeleteTechniqueModal(false);
            setTechniqueToDelete(null);
            setTechniquesState((prevTechniques) =>
                prevTechniques.filter((technique) => technique._id !== techniqueToDelete)
            );
        } catch (error) {
            console.error('Error al eliminar técnica:', error);
        }
    };

    return (
        <div>
            <h1>Techniques</h1>
            <table style={styles.table}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} style={styles.cell}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} style={styles.cell}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modals para agregar/eliminar campos y técnicas */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>Agregar nuevo campo</h2>
                        <input
                            type="text"
                            placeholder="Nombre del campo"
                            value={newFieldName}
                            onChange={(e) => setNewFieldName(e.target.value)}
                            style={styles.input}
                        />
                        <select
                            value={newFieldType}
                            onChange={(e) => setNewFieldType(e.target.value)}
                            style={styles.input}
                        >
                            <option value="">Selecciona el tipo de dato</option>
                            <option value="Text">Texto</option>
                            <option value="Number">Número</option>
                            <option value="Checklist">Checklist</option>
                            <option value="Select">Select</option>
                            <option value="Multiselect">Multiselect</option>
                            <option value="Date">Fecha</option>
                            <option value="CreationDate">Fecha de Creación</option>
                            <option value="CreationTime">Hora de Creación</option>
                            <option value="Hyperlink">URL</option>
                        </select>

                        <button onClick={handleAddNewField} style={styles.saveButton}>
                            Agregar
                        </button>
                        <button onClick={() => setShowModal(false)} style={styles.closeButton}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>¿Eliminar el campo "{fieldToDelete}"?</h2>
                        <button onClick={handleConfirmDeleteField} style={styles.deleteButton}>
                            Confirmar
                        </button>
                        <button onClick={() => setShowDeleteModal(false)} style={styles.closeButton}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {showDeleteTechniqueModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>¿Estás seguro de que deseas eliminar esta técnica?</h2>
                        <button onClick={handleConfirmDeleteTechnique} style={styles.deleteButton}>
                            Confirmar
                        </button>
                        <button onClick={() => setShowDeleteTechniqueModal(false)} style={styles.closeButton}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid black',
    },
    cell: {
        textAlign: 'left',
        border: '1px solid black',
        padding: '8px',
    },
    deleteButton: {
        color: 'red',
    },
    addNewFieldButton: {
        color: 'blue',
    },
    deleteFieldButton: {
        background: 'none',
        border: 'none',
        color: 'red',
        cursor: 'pointer',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '5px',
        width: '300px',
    },
    input: {
        width: '100%',
        marginBottom: '1rem',
        padding: '0.5rem',
    },
    saveButton: {
        marginRight: '0.5rem',
    },
    closeButton: {
        color: 'red',
    },
};

export default TechniqueTable;
