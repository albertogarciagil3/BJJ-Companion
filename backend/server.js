const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Classification = require('./models/Classification');
const Position = require('./models/Position');
const Technique = require('./models/Technique');
const IfEscenario = require('./models/ifScenario');
const Duality = require('./models/duality');
const TechniqueType = require('./models/techniqueType');
const TechniqueCustomField = require('./models/TechniqueCustomField');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose
    .connect('mongodb+srv://albertogarcia:simameyes1A@cluster0.zo0zreb.mongodb.net/BJJCompanion?retryWrites=true&w=majority')
    .then(() => console.log('Conectado a MongoDB Atlas correctamente'))
    .catch((err) => console.error('Error conectando a MongoDB:', err.message));

// ---------------------- Función para obtener el valor predeterminado ----------------------
function getDefaultValue(type) {
    switch (type) {
        case 'Text':
            return '';
        case 'Number':
            return 0;
        case 'Checklist':
            return false;
        case 'Select':
        case 'Hyperlink':
            return '';
        case 'Multiselect':
            return [];
        case 'Date':
        case 'CreationDate':
            return new Date();
        case 'CreationTime':
            return new Date().toISOString();
        default:
            return null;
    }
}

// ---------------------- Rutas para Clasificaciones ----------------------
app.post('/clasificaciones', async (req, res) => {
    try {
        const newClassification = new Classification(req.body);
        await newClassification.save();
        res.status(201).json(newClassification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/clasificaciones', async (req, res) => {
    try {
        const classifications = await Classification.find();
        res.status(200).json(classifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/clasificaciones/:id', async (req, res) => {
    try {
        const updatedClassification = await Classification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedClassification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/clasificaciones/:id', async (req, res) => {
    try {
        const deletedClassification = await Classification.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedClassification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- Rutas para Posiciones ----------------------
app.post('/positions', async (req, res) => {
    try {
        const newPosition = new Position(req.body);
        await newPosition.save();
        res.status(201).json(newPosition);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/positions', async (req, res) => {
    try {
        const positions = await Position.find()
            .populate('duality') // Para obtener los detalles completos de la dualidad
            .populate('entries')  // Para obtener detalles de las técnicas
            .populate('parentPosition') // Para obtener la posición padre
            .populate('scenariosIf'); // Para obtener los IFs relacionados
        res.status(200).json(positions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/positions/:id', async (req, res) => {
    try {
        const updatedPosition = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPosition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/positions/:id', async (req, res) => {
    try {
        const deletedPosition = await Position.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPosition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- Rutas para Técnicas ----------------------
app.post('/techniques', async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body); // <-- Verifica aquí

    try {
        // Extraer los datos de la técnica sin los campos personalizados
        const { TechniqueCustomFields, ...techniqueData } = req.body;

        // Crear la técnica base sin campos personalizados
        const newTechnique = new Technique(techniqueData);

        // Obtener todos los campos personalizados de la colección `TechniqueCustomField`
        const allCustomFields = await TechniqueCustomField.find();

        // Si `TechniqueCustomFields` viene en el request, utiliza esos valores
        if (TechniqueCustomFields && Array.isArray(TechniqueCustomFields) && TechniqueCustomFields.length > 0) {
            TechniqueCustomFields.forEach(field => {
                if (field.field && field.value !== undefined) {
                    newTechnique.TechniqueCustomFields.push({
                        field: field.field,
                        value: field.value
                    });
                }
            });
        } else {
            // Si no se envían `TechniqueCustomFields`, agrega todos los campos personalizados con valor por defecto
            allCustomFields.forEach(field => {
                newTechnique.TechniqueCustomFields.push({
                    field: field._id,
                    value: field.defaultValue || null // Usa defaultValue si existe o null si no
                });
            });
        }

        // Guardar la nueva técnica en la base de datos
        await newTechnique.save();
        res.status(201).json(newTechnique);

    } catch (err) {
        console.error("Error al crear Technique:", err);
        res.status(400).json({ error: err.message });
    }
});



app.get('/techniques', async (req, res) => {
    try {
        const techniques = await Technique.find()
            .populate('relatedEntries')
            .populate('TechniqueCustomFields.field'); // Popula los detalles de los campos personalizados

        res.status(200).json(techniques);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.put('/techniques/:id', async (req, res) => {
    try {
        const updatedTechnique = await Technique.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTechnique);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/techniques/:id', async (req, res) => {
    try {
        const deletedTechnique = await Technique.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTechnique);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- Rutas para IfEscenarios ----------------------
app.post('/ifescenarios', async (req, res) => {
    try {
        const newIfEscenario = new IfEscenario(req.body);
        await newIfEscenario.save();
        res.status(201).json(newIfEscenario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/ifescenarios', async (req, res) => {
    try {
        const ifEscenarios = await IfEscenario.find();
        res.status(200).json(ifEscenarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/ifescenarios/:id', async (req, res) => {
    try {
        const updatedIfEscenario = await IfEscenario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedIfEscenario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/ifescenarios/:id', async (req, res) => {
    try {
        const deletedIfEscenario = await IfEscenario.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedIfEscenario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- Rutas para Dualidades ----------------------
app.post('/dualities', async (req, res) => {
    try {
        const newDuality = new Duality(req.body);
        await newDuality.save();
        res.status(201).json(newDuality);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/dualities', async (req, res) => {
    try {
        const dualities = await Duality.find();
        res.status(200).json(dualities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/dualities/:id', async (req, res) => {
    try {
        const updatedDuality = await Duality.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDuality);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/dualities/:id', async (req, res) => {
    try {
        const deletedDuality = await Duality.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedDuality);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- Rutas para Tipos de Técnica ----------------------
app.post('/techniquetypes', async (req, res) => {
    try {
        const newTechniqueType = new TechniqueType(req.body);
        await newTechniqueType.save();
        res.status(201).json(newTechniqueType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/techniquetypes', async (req, res) => {
    try {
        const techniqueTypes = await TechniqueType.find();
        res.status(200).json(techniqueTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/techniquetypes/:id', async (req, res) => {
    try {
        const updatedTechniqueType = await TechniqueType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTechniqueType);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/techniquetypes/:id', async (req, res) => {
    try {
        const deletedTechniqueType = await TechniqueType.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTechniqueType);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ---------------------- Rutas para Custom Fields ----------------------

// Ruta para obtener todos los campos personalizados
app.get('/custom-fields', async (req, res) => {
    try {
        const customFields = await TechniqueCustomField.find(); // Obteniendo todos los campos personalizados
        res.status(200).json(customFields);
    } catch (error) {
        console.error('Error al obtener los campos personalizados:', error);
        res.status(500).json({ message: 'Error al obtener los campos personalizados', error });
    }
});


// Ruta para agregar un campo personalizado a todas las técnicas
app.post('/custom-fields', async (req, res) => {
    const { name, type, options } = req.body;
    console.log('Datos recibidos en /custom-fields:', { name, type, options });

    const defaultValue = getDefaultValue(type);
    console.log('Valor predeterminado asignado:', defaultValue);

    try {
        // Verificar si ya existe un campo con el mismo nombre
        const existingField = await TechniqueCustomField.findOne({ name });
        if (existingField) {
            console.log('Campo personalizado con este nombre ya existe:', existingField);
            return res.status(400).json({ message: 'Ya existe un campo personalizado con ese nombre' });
        }

        // Creando el nuevo campo personalizado
        const newCustomField = new TechniqueCustomField({ name, type, options, defaultValue });
        await newCustomField.save();
        console.log('Campo personalizado guardado en la colección TechniqueCustomField:', newCustomField);

        // Intento de agregar el campo personalizado a todas las técnicas
        try {
            console.log('Intentando agregar el nuevo campo personalizado a todas las técnicas...');
            const result = await Technique.updateMany({}, {
                $push: { TechniqueCustomFields: { field: newCustomField._id, value: defaultValue } }
            });
            console.log('Campo personalizado agregado a todas las técnicas:', result);

            res.status(200).json({ message: 'Campo personalizado añadido exitosamente' });
        } catch (techniqueError) {
            console.error('Error al agregar el campo personalizado a las técnicas:', techniqueError);
            return res.status(500).json({
                message: 'Error al actualizar las técnicas con el nuevo campo personalizado',
                error: techniqueError
            });
        }

    } catch (error) {
        console.error('Error en la ruta /custom-fields al añadir el campo personalizado:', error);
        res.status(500).json({ message: 'Error al añadir el campo personalizado', error });
    }
});


// Ruta para eliminar un campo personalizado de todas las técnicas
app.delete('/custom-fields/:fieldId', async (req, res) => {
    const { fieldId } = req.params;

    try {
        // Elimina el campo personalizado de todas las técnicas
        await Technique.updateMany({}, {
            $pull: { TechniqueCustomFields: { field: fieldId } }
        });

        // Elimina el documento del campo personalizado en la colección `TechniqueCustomField`
        await TechniqueCustomField.findByIdAndDelete(fieldId);

        res.status(200).json({ message: 'Campo personalizado eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el campo personalizado', error });
    }
});


// ---------------------- Iniciar servidor ----------------------
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
