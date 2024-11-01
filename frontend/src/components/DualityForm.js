import React, { useState } from 'react';

const DualityForm = ({ addDuality }) => {
    const [element1, setElement1] = useState('');
    const [element2, setElement2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!element1 || !element2) {
            alert('Ambos elementos son requeridos');
            return;
        }

        // Concatenar los elementos para generar el nombre
        const name = `${element1}/${element2}`;
        const newDuality = { name, element1, element2 };

        try {
            // Aquí intentamos enviar los datos al servidor mediante `addDuality`
            await addDuality(newDuality);
            setElement1('');
            setElement2('');
        } catch (error) {
            console.error('Error creando dualidad:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Elemento 1:</label>
            <input
                type="text"
                value={element1}
                onChange={(e) => setElement1(e.target.value)}
            />

            <label>Elemento 2:</label>
            <input
                type="text"
                value={element2}
                onChange={(e) => setElement2(e.target.value)}
            />

            <button type="submit">Agregar Dualidad</button>
        </form>
    );
};

export default DualityForm;
