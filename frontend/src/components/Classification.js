import React, { useState } from 'react';
import axios from 'axios';

const Classification = ({ classification, updateClassification, deleteClassification }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(classification.name);
    const [description, setDescription] = useState(classification.description || ''); // La descripción es opcional

    // Manejar cambios en los inputs
    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    // Guardar cambios cuando el input pierde el foco
    const handleBlur = async () => {
        setIsEditing(false);
        try {
            // Validar que el campo de nombre no esté vacío
            if (!name.trim()) {
                alert('El nombre es obligatorio');
                setName(classification.name);
                return;
            }

            const updatedClassification = { ...classification, name, description };
            await axios.put(`http://localhost:5000/clasificaciones/${classification._id}`, updatedClassification);
            updateClassification(updatedClassification);
        } catch (error) {
            console.error('Error al actualizar la clasificación:', error);
        }
    };

    // Función para manejar la eliminación
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/clasificaciones/${classification._id}`);
            deleteClassification(classification._id);
        } catch (error) {
            console.error('Error al eliminar la clasificación:', error);
        }
    };

    return (
        <div style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem' }}>
            {isEditing ? (
                <div>
                    {/* Modo de Edición */}
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        onBlur={handleBlur}
                        autoFocus
                        required
                        onKeyPress={(e) => e.key === 'Enter' && handleBlur()}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        onBlur={handleBlur}
                        style={{ display: 'block', marginTop: '0.5rem', width: '100%', padding: '0.5rem' }}
                        onKeyPress={(e) => e.key === 'Enter' && handleBlur()}
                    />
                </div>
            ) : (
                <div>
                    {/* Modo de Visualización */}
                    <h3 onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
                        {name}
                    </h3>
                    <p onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
                        {description || 'Sin descripción'}
                    </p>
                </div>
            )}
            <button onClick={handleDelete} style={{ marginTop: '0.5rem', color: 'red' }}>
                Eliminar Clasificación
            </button>
        </div>
    );
};

export default Classification;
