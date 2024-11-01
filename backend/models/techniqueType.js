const mongoose = require('mongoose');

const TechniqueTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  // Asegura que el nombre del tipo de técnica sea único
        maxlength: 50
    }
});

module.exports = mongoose.model('TechniqueType', TechniqueTypeSchema);
