const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Classification = require('./models/Classification');
const Position = require('./models/Position');
const Technique = require('./models/Technique');
const IfEscenario = require('./models/ifScenario');
const Duality = require('./models/duality');
const TechniqueType = require('./models/techniqueType');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose
    .connect('mongodb+srv://albertogarcia:simameyes1A@cluster0.zo0zreb.mongodb.net/BJJCompanion?retryWrites=true&w=majority')
    .then(() => console.log('Conectado a MongoDB Atlas correctamente'))
    .catch((err) => console.error('Error conectando a MongoDB:', err.message));

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
    try {
        const newTechnique = new Technique(req.body);
        await newTechnique.save();
        res.status(201).json(newTechnique);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/techniques', async (req, res) => {
    try {
        const techniques = await Technique.find().populate('relatedEntries');
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

// ---------------------- Iniciar servidor ----------------------
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
