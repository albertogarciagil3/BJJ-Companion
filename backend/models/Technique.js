const mongoose = require('mongoose');

const TechniqueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    techniqueType: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TechniqueType', // Referencia al componente de TechniqueType
            required: true
        }
    ],
    positionStart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position', // La posición de inicio de la técnica
        required: true
    },
    endPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position', // Posición final de la técnica
        required: true
    },
    temporalPositions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position' // Otras posiciones que son parte de la secuencia, varias posiciones permitidas
        }
    ],
    ifScenarios: [ // Cambiado a array para manejar múltiples IFs
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IfEscenario', // El if asociado a la técnica
            required: false
        }
    ],
    media: [
        {
            type: String // URLs del video o imágenes relacionadas con la técnica
        }
    ],
    proficiencyLevel: {
        type: Number,
        min: 1,
        max: 10
    },
    practiceToday: {
        type: Boolean,
        default: false
    },
    giNoGi: {
        type: String, // "gi", "nogi", "both"
        enum: ['gi', 'nogi', 'both'],
        default: 'both'
    },
    relatedEntries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Technique' // Técnicas relacionadas (dependencia de otra técnica)
        }
    ],
    relatedPositions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position' // Posiciones relacionadas con la técnica
        }
    ],
    customFields: {
        type: Map,
        of: String, // Campos personalizados con pares clave-valor
        default: {}
    },
    notesPage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page', // Referencia a la entidad de Page para almacenar notas y otros contenidos
        required: false // No es obligatoria pero útil para expandir la funcionalidad
    }
});

module.exports = mongoose.model('Technique', TechniqueSchema);
