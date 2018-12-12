const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegistroSchema = new Schema({
    tipo:{type: String, required: true},
    descripcion:{type: String, required: true},
    departamento:{type: String, required: true},
    usuario:{type: String, required: true},
    fecha:{ type: Date, default:Date.now },
    estado:{type: String, required: true}
 });
 
 module.exports = mongoose.model('Registro', RegistroSchema);