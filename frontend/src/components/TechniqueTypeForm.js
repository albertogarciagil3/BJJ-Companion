import React, { useState } from 'react';

const TechniqueTypeForm = ({ addTechniqueType }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert('El campo de nombre es requerido');
            return;
        }

        const newTechniqueType = { name, description };

        try {
            await addTechniqueType(newTechniqueType);
            setName('');
            setDescription('');
        } catch (error) {
            console.error('Error creando tipo de técnica:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre del Tipo de Técnica:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label>Descripción (opcional):</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Agregar Tipo de Técnica</button>
        </form>
    );
};

export default TechniqueTypeForm;
