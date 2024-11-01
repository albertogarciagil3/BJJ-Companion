const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 200
    },
    classifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Classification' // Una posición puede pertenecer a varias clasificaciones
        }
    ],
    parentPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position', // Relación con una posible posición padre
        required: false
    },
    duality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Duality', // Relación con el componente de dualidad
        required: true
    },
    scenariosIf: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IfEscenario' // Relación con los ifs asociados a la posición
        }
    ],
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Technique' // Técnicas que terminan en esta posición
        }
    ],
    media: [
        {
            type: String // URLs de fotos o videos de la posición
        }
    ],
    proficiencyLevel: {
        type: Number,
        min: 1,
        max: 10
    },
    giNoGi: {
        type: String, // "gi", "nogi", "both"
        enum: ['gi', 'nogi', 'both'],
        default: 'both'
    },
    notesPage: {
        type: mongoose.Schema.Types.ObjectId, // Referencia a la entidad de "Page" para comentarios/notas
        ref: 'Page', // Relación con un documento Page
        required: false
    },
    customFields: {
        type: Map,
        of: String, // Mapa de campos personalizados (clave-valor) definidos por el usuario
        default: {} // Valor por defecto: un objeto vacío
    }
});

module.exports = mongoose.model('Position', PositionSchema);
