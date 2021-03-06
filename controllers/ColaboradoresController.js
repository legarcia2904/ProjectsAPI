var mongoose = require('mongoose');

var Colaboradores = mongoose.model('Colaborador');
var Proyectos = mongoose.model('Proyecto');

/**
* Obtener todos los Colaboradores registrados en la base de datos.
*/
exports.getColaboradores = function(req, res, next){
    console.log('GET /colaboradores');
    Colaboradores.find(req.query, function (err, colaboradores) {
        if(err){
            return res.status(500).jsonp({error:'500', descrip:err.message});
        }else{
            res.status(200).jsonp(colaboradores);
        }
    });
};

/**
 * Crear un nuevo colaborador en la base de datos
 */
exports.addColaborador = function(req, res, next){
    console.log('POST /colaboradores');
    var colaborador = new Colaboradores({
        nombre :req.body.nombre,
        email : req.body.email,
        categoria : req.body.categoria,
        sitio_web : req.body.sitio_web,
    });

    colaborador.save(function (err, colaborador) {
        if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
        res.status(200).jsonp(colaborador);
    });
};

/**
 Obtener el colaborador identificado con el ID. En caso de no
 encontrar el colaborador, retornar un objeto JSON con un
 código y descripción del error.
 */
exports.getById = function(req, res, next){
    console.log('GET /colaboradores:id');
    Colaboradores.findById(req.params.id, function (err, colaborador) {
        if(err){
            return res.status(500).jsonp({error:'500', descrip:err.message});
        }
        else {
            return res.status(200).jsonp(colaborador);
        }
    });
};

/**
 * Actualizar los datos del colaborador identificado con el ID. El
 método debe de regresar el registro actualizado. En
 caso de no encontrar el colaborador solicitado, retornar un
 objeto JSON con un código y descripción del error.
 */
exports.updateColaborador = function (req, res, next) {
    console.log('PUT /colaboradores/:id');
    console.log(req.params.id);
    console.log(req.body);
   Colaboradores.findById(req.params.id,function (err, colaborador) {
       if(err){
           res.status(500).jsonp({error:'500', descrip:err.message});
       }else{
           req.body.nombre?colaborador.nombre = req.body.nombre:null;
           req.body.descripcion?colaborador.descripcion = req.body.descripcion:null;
           req.body.email?colaborador.email = req.body.email:null
           req.body.categoria?colaborador.categoria = req.body.categoria:null;
           req.body.sitio_web?colaborador.sitio_web = req.body.sitio_web:null;
           colaborador.save(function (err, colaborador) {
               if(err){
                   return res.status(500).jsonp({error:'500', descrip:err.message});
               }
               else{
                   return res.status(200).jsonp(colaborador);
               }
           });
       }
   })
};

/**
 * Eliminar todos los proyectos que se encuentren
 relacionaciodos con el colaborador (ID). El método debe de
 regresar todos los registros eliminados. En caso de no
 encontrar colaborador, retornar un objeto JSON con un
 código y descripción del error.
 */
exports.deleteColaborador = function(req, res, next){
    console.log('DELETE /colaboradores/:id');
    console.log(req.params.id);

    Colaboradores.findById(req.params.id, function (err, colaborador) {
       if(err || !colaborador){
           return res.status(500).jsonp({error:'505', descrip:"Registro no existente."});
       }else{
           Proyectos.find({'colaborador':req.params.id}).remove().exec(function (err, proyecto) {
               Colaboradores.findByIdAndRemove(req.params.id, function (err, colaborador) {
                   if(err){
                       return res.status(500).jsonp({error:'500', descrip:err.message});
                   }else{
                       res.status(200).jsonp(colaborador);
                   }
               });
           });
       }
    });
};

/**
 * Obtener todos los proyectos en los cuales se incluye el colaborador identificado con ID.
 */
exports.getProyectosPorColaborador = function (req, res, next) {
    console.log('GET /colaboradores/:id/proyectos');
    Colaboradores.findById(req.params.id, function (err, colaborador) {
        if(err || !colaborador){
            return res.status(500).jsonp({error:'500', descrip:err.message});
        }else{
            Proyectos.find({'colaborador':req.params.id}).populate('colaborador').exec(function (err, proyecto) {
                if(err){
                    return res.status(500).jsonp({error:'500', descrip:err.message});
                }else{
                    if(proyecto.length==0){
                        return res.status(500).jsonp({error:'500', descrip:"Actualmente el colaborador no cuenta con proyectos."});
                    }else{
                        return res.status(200).jsonp(proyecto);
                    }
                }
            });
        }
    });
};
