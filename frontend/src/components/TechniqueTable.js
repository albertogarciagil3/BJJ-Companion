import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { getPositions, getTechniqueTypes } from '../services/api';

const TechniqueTable = ({ techniques, updateTechnique, deleteTechnique }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editedTechnique, setEditedTechnique] = useState(null);
    const [positions, setPositions] = useState([]);
    const [techniqueTypes, setTechniqueTypes] = useState([]);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const data = await getPositions();
                setPositions(data);
            } catch (error) {
                console.error('Error al obtener posiciones:', error);
            }
        };
        fetchPositions();
    }, []);

    useEffect(() => {
        const fetchTechniqueTypes = async () => {
            try {
                const data = await getTechniqueTypes();
                setTechniqueTypes(data);
            } catch (error) {
                console.error('Error al obtener tipos de técnica:', error);
            }
        };
        fetchTechniqueTypes();
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

    const columns = useMemo(
        () => [
            { accessorKey: 'name', header: 'Nombre' },
            {
                accessorKey: 'techniqueType',
                header: 'Tipo',
                cell: ({ getValue }) => getTechniqueTypeName(getValue()),
            },
            {
                accessorKey: 'positionStart',
                header: 'Posición Inicial',
                cell: ({ getValue }) => getPositionName(getValue()),
            },
            {
                accessorKey: 'endPosition',
                header: 'Posición Final',
                cell: ({ getValue }) => getPositionName(getValue()),
            },
            { accessorKey: 'proficiencyLevel', header: 'Proficiency Level' },
            { accessorKey: 'giNoGi', header: 'Gi/No Gi' },
            {
                header: 'Acciones',
                cell: ({ row }) => (
                    <>
                        <button onClick={() => handleEdit(row.original)}>Editar</button>
                        <button
                            onClick={() => deleteTechnique(row.original._id)}
                            style={styles.deleteButton}
                        >
                            Eliminar
                        </button>
                    </>
                ),
            },
        ],
        [positions, techniqueTypes]
    );

    const table = useReactTable({
        data: techniques,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleEdit = (technique) => {
        setIsEditing(technique._id);
        setEditedTechnique({ ...technique });
    };

    const handleSave = () => {
        updateTechnique(editedTechnique);
        setIsEditing(null);
    };

    const handleCancel = () => {
        setIsEditing(null);
        setEditedTechnique(null);
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
};

export default TechniqueTable;
