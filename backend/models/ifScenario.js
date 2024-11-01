const mongoose = require('mongoose');

const IfEscenarioSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,  // La descripción del escenario "if", por ejemplo: "Si el oponente controla tu brazo"
        maxlength: 200
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',  // Referencia a la posición donde aplica el if
        required: false   // Opcional si es un if relacionado directamente a una técnica y no una posición
    },
    technique: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technique',  // Referencia a la técnica que utiliza este if
        required: false    // Opcional si es un if relacionado solo a la posición
    },
    createdByUser: {
        type: Boolean,
        default: false     // Campo para saber si fue creado por un usuario en un formulario (para sugerencias o nuevos ifs)
    }
});

module.exports = mongoose.model('IfEscenario', IfEscenarioSchema);
