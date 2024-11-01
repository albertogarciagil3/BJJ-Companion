const mongoose = require('mongoose');

const DualitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  // Asegura que el nombre de la dualidad sea único, como "Top/Bottom", "Ataque/Defensa", etc.
        maxlength: 50
    },
    element1: {
        type: String,
        required: true  // Primer elemento de la dualidad, como "Top", "Ataque", etc.
    },
    element2: {
        type: String,
        required: true  // Segundo elemento de la dualidad, como "Bottom", "Defensa", etc.
    }
});

module.exports = mongoose.model('Duality', DualitySchema);
