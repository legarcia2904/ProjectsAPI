var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proyectoSchema = new Schema({
   nombre: {type:String},
   descripcion: {type:String},
   area_conocimiento: {type:String},
   fecha_inicio: {type:String},
   fecha_fin: {type:String},
   presupuesto:{type:Number},
   colaborador: {
       type: Schema.Types.ObjectId,
       ref: 'Colaborador',
       required: true
   },
},
{
    versionKey:false
});

module.exports = mongoose.model('Proyecto', proyectoSchema);