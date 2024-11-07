// models/TechniqueTechniqueCustomField.js
const mongoose = require('mongoose');

const TechniqueCustomFieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['Text', 'Number', 'Checklist', 'Select', 'Multiselect', 'Date', 'CreationDate', 'CreationTime', 'Hyperlink'],
        required: true
    },
    defaultValue: mongoose.Schema.Types.Mixed, // Valor por defecto, puede ser cualquier tipo de dato
    options: [String], // Opciones para los tipos select o multiselect
});

module.exports = mongoose.model('TechniqueCustomField', TechniqueCustomFieldSchema);
