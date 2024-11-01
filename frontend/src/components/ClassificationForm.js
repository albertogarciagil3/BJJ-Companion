import React, { useState } from 'react';

const ClassificationForm = ({ addClassification }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación: asegurarse de que el nombre esté presente
        if (name.trim() === '') {
            alert('El nombre de la clasificación es requerido');
            return;
        }

        // Crear nueva clasificación
        addClassification({ name, description });

        // Limpiar campos después de agregar
        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            <label style={styles.label}>Nombre de la Clasificación:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.inputField}
                placeholder="Nombre de la clasificación"
            />

            <label style={styles.label}>Descripción:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textArea}
                placeholder="Descripción de la clasificación (opcional)"
            />

            <button type="submit" style={styles.submitButton}>
                Agregar Clasificación
            </button>
        </form>
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

export default ClassificationForm;
