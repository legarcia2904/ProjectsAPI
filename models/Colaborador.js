var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Colaboradores = mongoose.model('Proyecto');

var colaboradorSchema = new Schema({
    nombre: {type:String},
    descripcion:{type:String},
    email:{type:String},
    categoria:{type:String},
    sitio_web:{type:String}
},
{
    versionKey:false
});

module.exports = mongoose.model('Colaborador', colaboradorSchema);
