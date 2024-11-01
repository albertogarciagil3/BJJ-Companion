import React, { useState } from 'react';

const IfEscenarioForm = ({ addIfEscenario }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description) {
            alert('La descripción es requerida');
            return;
        }

        const newIfEscenario = { description };

        try {
            await addIfEscenario(newIfEscenario);
            setDescription('');
        } catch (error) {
            console.error('Error al crear el escenario IF:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Descripción del Escenario IF:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Añadir IF</button>
        </form>
    );
};

export default IfEscenarioForm;
