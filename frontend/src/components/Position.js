import React, { useState, useRef, useEffect } from 'react';

const PositionTable = ({ positions, updatePosition, deletePosition }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(null);
    const tableRef = useRef(null); // Referencia a la tabla

    const handleEdit = (position) => {
        setIsEditing(true);
        setCurrentEdit(position);
    };

    const handleEditSubmit = () => {
        updatePosition(currentEdit);
        setIsEditing(false);
        setCurrentEdit(null);
    };

    const onMouseDown = (e, th) => {
        const startX = e.pageX;
        const startWidth = th.offsetWidth;

        const onMouseMove = (e) => {
            const newWidth = startWidth + (e.pageX - startX);
            th.style.width = `${newWidth}px`;
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    useEffect(() => {
        const ths = tableRef.current.querySelectorAll('th');
        ths.forEach((th) => {
            th.style.position = 'relative';
            const resizer = document.createElement('div');
            resizer.style.width = '5px';
            resizer.style.height = '100%';
            resizer.style.position = 'absolute';
            resizer.style.right = '0';
            resizer.style.top = '0';
            resizer.style.cursor = 'col-resize';
            resizer.addEventListener('mousedown', (e) => onMouseDown(e, th));
            th.appendChild(resizer);
        });
    }, []);

    const styles = {
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'auto',
        },
        th: {
            border: '1px solid black',
            padding: '8px',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            fontSize: '16px',
            
        },
        td: {
            border: '1px solid black',
            padding: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '12px',
        },
        deleteButton: {
            color: 'red',
        },
    };

    return (
        <div>
            <h1>Positions</h1>
            {isEditing && currentEdit ? (
                <div>
                    <h2>Editando: {currentEdit.name}</h2>
                    <input
                        type="text"
                        value={currentEdit.name}
                        onChange={(e) =>
                            setCurrentEdit({ ...currentEdit, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={currentEdit.description}
                        onChange={(e) =>
                            setCurrentEdit({ ...currentEdit, description: e.target.value })
                        }
                    />
                    <button onClick={handleEditSubmit}>Guardar</button>
                </div>
            ) : (
                <table ref={tableRef} style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Descripción</th>
                            <th style={styles.th}>Dualidad</th>
                            <th style={styles.th}>Escenarios IF</th>
                            <th style={styles.th}>Proficiency Level</th>
                            <th style={styles.th}>Gi/NoGi</th>
                            <th style={styles.th}>Notas</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position) => (
                            <tr key={position._id}>
                                <td style={styles.td}>{position.name}</td>
                                <td style={styles.td}>{position.description || 'Sin descripción'}</td>
                                <td style={styles.td}>
                                    {position.duality?.element1 && position.duality?.element2
                                        ? `${position.duality.element1}/${position.duality.element2}`
                                        : 'No especificada'}
                                </td>
                                <td style={styles.td}>
                                    {position.scenariosIf.length > 0 ? (
                                        <ul>
                                            {position.scenariosIf.map((ifScenario) => (
                                                <li key={ifScenario._id}>
                                                    {ifScenario.description || 'Sin descripción'}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        'No hay escenarios IF'
                                    )}
                                </td>
                                <td style={styles.td}>{position.proficiencyLevel}</td>
                                <td style={styles.td}>{position.giNoGi}</td>
                                <td style={styles.td}>{position.notesPage || 'Sin notas'}</td>
                                <td style={styles.td}>
                                    <button onClick={() => handleEdit(position)}>Editar</button>
                                    <button
                                        onClick={() => deletePosition(position._id)}
                                        style={styles.deleteButton}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PositionTable;
