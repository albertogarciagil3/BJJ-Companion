import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});
console.log('Base URL de API:', api.defaults.baseURL);

// Clasificaciones
export const getClassifications = async () => {
    try {
        const response = await api.get('/clasificaciones');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo las clasificaciones:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createClassification = async (newClassification) => {
    try {
        const response = await api.post('/clasificaciones', newClassification);
        return response.data;
    } catch (error) {
        console.error('Error creando una nueva clasificación:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateClassification = async (classification) => {
    try {
        const response = await api.put(`/clasificaciones/${classification._id}`, classification);
        return response.data;
    } catch (error) {
        console.error('Error actualizando la clasificación:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteClassification = async (id, name) => {
    if (name === 'Nuevas Posiciones') {
        alert('No se puede eliminar la clasificación predeterminada.');
        return;
    }
    try {
        const response = await api.delete(`/clasificaciones/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando la clasificación:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Posiciones
export const getPositions = async () => {
    try {
        const response = await api.get('/positions');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo las posiciones:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createPosition = async (newPosition) => {
    try {
        // Validación actualizada: asegúrate de que 'duality' tiene un ObjectId
        if (!newPosition.duality) {
            throw new Error("El campo 'duality' es obligatorio. Asegúrate de seleccionar una dualidad.");
        }

        const response = await api.post('/positions', newPosition);
        return response.data;
    } catch (error) {
        console.error('Error creando una nueva posición:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updatePosition = async (position) => {
    try {
        // Validación actualizada: asegúrate de que 'duality' tiene un ObjectId
        if (!position.duality) {
            throw new Error("El campo 'duality' es obligatorio. Asegúrate de seleccionar una dualidad.");
        }

        const response = await api.put(`/positions/${position._id}`, position);
        return response.data;
    } catch (error) {
        console.error('Error actualizando la posición:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deletePosition = async (id) => {
    try {
        const response = await api.delete(`/positions/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando la posición:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Técnicas
export const getTechniques = async () => {
    try {
        const response = await api.get('/techniques');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo las técnicas:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createTechnique = async (newTechnique) => {
    try {
        const response = await api.post('/techniques', newTechnique);
        return response.data;
    } catch (error) {
        console.error('Error creando una nueva técnica:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateTechnique = async (technique) => {
    try {
        const response = await api.put(`/techniques/${technique._id}`, technique);
        return response.data;
    } catch (error) {
        console.error('Error actualizando la técnica:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteTechnique = async (id) => {
    try {
        const response = await api.delete(`/techniques/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando la técnica:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// IfEscenarios (Escenarios IF)
export const getIfEscenarios = async () => {
    try {
        const response = await api.get('/ifEscenarios');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo los escenarios IF:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createIfEscenario = async (newIfEscenario) => {
    try {
        const response = await api.post('/ifEscenarios', newIfEscenario);
        return response.data;
    } catch (error) {
        console.error('Error creando un nuevo escenario IF:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateIfEscenario = async (ifEscenario) => {
    try {
        const response = await api.put(`/ifEscenarios/${ifEscenario._id}`, ifEscenario);
        return response.data;
    } catch (error) {
        console.error('Error actualizando el escenario IF:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteIfEscenario = async (id) => {
    try {
        const response = await api.delete(`/ifEscenarios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando el escenario IF:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Dualidad
export const getDualities = async () => {
    try {
        const response = await api.get('/dualities');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo las dualidades:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createDuality = async (newDuality) => {
    try {
        const response = await api.post('/dualities', newDuality);
        return response.data;
    } catch (error) {
        console.error('Error creando una nueva dualidad:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateDuality = async (duality) => {
    try {
        const response = await api.put(`/dualities/${duality._id}`, duality);
        return response.data;
    } catch (error) {
        console.error('Error actualizando la dualidad:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteDuality = async (id) => {
    try {
        const response = await api.delete(`/dualities/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando la dualidad:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Tipos de Técnica
export const getTechniqueTypes = async () => {
    try {
        const response = await api.get('/techniqueTypes');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo los tipos de técnicas:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createTechniqueType = async (newTechniqueType) => {
    try {
        const response = await api.post('/techniqueTypes', newTechniqueType);
        return response.data;
    } catch (error) {
        console.error('Error creando un nuevo tipo de técnica:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateTechniqueType = async (techniqueType) => {
    try {
        const response = await api.put(`/techniqueTypes/${techniqueType._id}`, techniqueType);
        return response.data;
    } catch (error) {
        console.error('Error actualizando el tipo de técnica:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteTechniqueType = async (id) => {
    try {
        const response = await api.delete(`/techniqueTypes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando el tipo de técnica:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Añadir la función para obtener custom fields
export const getTechniqueCustomFields = async () => {
    try {
        const response = await api.get('/custom-fields');
        return response.data;
    } catch (error) {
        console.error('Error al obtener campos personalizados:', error);
        throw error;
    }
};

// Añadir un campo personalizado a TechniqueCustomFields y aplicarlo a todas las técnicas
export const addTechniqueCustomField = async (name, type, options) => {
    try {
        // Log para verificar los datos que se envían
        console.log("Enviando datos a /custom-fields:", { name, type, options: options || [] });

        const response = await api.post('/custom-fields', { name, type, options: options || [] });
        return response.data;
    } catch (error) {
        console.error('Error al añadir campo personalizado:', error.response ? error.response.data : error.message);
        throw error;
    }
};



// Eliminar un campo personalizado de TechniqueCustomFields y todas las técnicas
export const deleteTechniqueCustomField = async (fieldId) => { // Cambiado a `fieldId`
    try {
        const response = await api.delete(`/custom-fields/${fieldId}`); // Cambiado a `fieldId`
        return response.data;
    } catch (error) {
        console.error('Error al eliminar campo personalizado:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Actualizar el valor de un campo personalizado en TechniqueCustomFields
export const updateTechniqueCustomField = async (fieldId, name, type, options) => { // Añadidos `name`, `type`, `options`
    try {
        const response = await api.put(`/custom-fields/${fieldId}`, { name, type, options }); // Cambiado a `fieldId`
        return response.data;
    } catch (error) {
        console.error('Error al actualizar campo personalizado:', error.response ? error.response.data : error.message);
        throw error;
    }
};