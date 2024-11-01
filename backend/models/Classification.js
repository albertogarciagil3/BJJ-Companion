// models/Classification.js
const mongoose = require('mongoose');

const ClassificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 100
    },
    customFields: {
        type: Map,
        of: String, // Esto permite agregar pares clave-valor como campos personalizados
        default: {},
    }
});

module.exports = mongoose.model('Classification', ClassificationSchema);
