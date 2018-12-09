const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncidenciaSchema = new Schema({
   tipo:{type: String, required:true},
   descripcion:{type: String, required:true} 
});


module.exports = mongoose.model('Incidencia', IncidenciaSchema);