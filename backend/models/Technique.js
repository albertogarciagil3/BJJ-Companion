// models/Technique.js
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
            ref: 'TechniqueType',
            required: true
        }
    ],
    positionStart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: true
    },
    endPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: true
    },
    temporalPositions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position'
        }
    ],
    ifScenarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IfEscenario',
            required: false
        }
    ],
    media: [
        {
            type: String
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
        type: String,
        enum: ['gi', 'nogi', 'both'],
        default: 'both'
    },
    relatedEntries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Technique'
        }
    ],
    relatedPositions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position'
        }
    ],
    // Relación con campos personalizados
    TechniqueCustomFields: [{
        field: { type: mongoose.Schema.Types.ObjectId, ref: 'TechniqueCustomField' },
        value: mongoose.Schema.Types.Mixed // Valor específico para el campo personalizado
    }],
    notesPage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
        required: false
    }
});

module.exports = mongoose.model('Technique', TechniqueSchema);
