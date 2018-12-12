const mongoose = require('mongoose');
const { Schema } = mongoose;

const DepartamentoSchema = new Schema({
    nombre:{type: String, required: true},
    descripcion:{type: String, required: true},

 });
 
 module.exports = mongoose.model('Departamento', DepartamentoSchema);