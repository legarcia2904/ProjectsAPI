var mongoose = require('mongoose');

var Proyectos = mongoose.model('Proyecto');

exports.getProyectos = function(req, res, next){
  Proyectos.find().populate('colaborador').exec(function (err, proyectos) {
      if(err){
          res.status(500).jsonp({error:'500', descrip:err.message});
      }else{
          console.log('GET /proyectos');
          res.status(200).jsonp(proyectos);
      }
  });
};

exports.addProyecto = function(req, res, next){
    console.log('POST /proyectos');
    var proyecto = new Proyectos({
        nombre :req.body.nombre,
        descripcion :req.body.descripcion,
        area_conocimiento :req.body.area_conocimiento,
        fecha_inicio :req.body.fecha_inicio,
        fecha_fin :req.body.fecha_fin,
        presupuesto :req.body.presupuesto,
        colaborador : req.body.colaborador,
    });

    proyecto.save(function (err, proyecto) {
        if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
        Proyectos.findById(proyecto._id).populate('colaborador').exec(function (err, proyecto) {
            if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
            res.status(200).jsonp(proyecto);
        })
    });
};

exports.getById = function(req, res, next){
    Proyectos.findById(req.params.id).populate('colaborador').exec(function (err, proyecto) {
        if(err){
            return res.status(500).jsonp({error:'500', descrip:err.message});
        }
        if(proyecto){
            console.log('GET /proyectos:id');
            return res.status(200).jsonp(proyecto);
        }else{
            return res.status(500).jsonp({error:'500', descrip:"Proyecto no existente"});
        }
    });
};

/**
 * Modificar registro proyecto, proporcionando los datos correspondientes.
 */
exports.updateProyecto = function(req, res, next){
    console.log('PUT /proyectos/:id');
    console.log(req.params.id);
    console.log(req.body);

    Proyectos.findById(req.params.id,function (err, proyecto) {
        if(err){
            res.status(500).jsonp({error:'500', descrip:err.message});
        }else{
            req.body.nombre?proyecto.nombre = req.body.nombre:null;
            req.body.descripcion?proyecto.descripcion = req.body.descripcion:null;
            req.body.area_conocimiento?proyecto.area_conocimiento = req.body.area_conocimiento:null;
            req.body.fecha_inicio?proyecto.fecha_inicio = req.body.fecha_inicio:null;
            req.body.fecha_fin?proyecto.fecha_fin = req.body.fecha_fin:null;
            req.body.presupuesto?proyecto.presupuesto = req.body.presupuesto:null;
            req.body.colaborador?proyecto.colaborador = req.body.colaborador:null;
            proyecto.save(function (err, proyecto) {
                if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
                Proyectos.findById(proyecto._id).populate('colaborador').exec(function (err, proyecto) {
                    if(err) return res.status(500).jsonp({error:'500', descrip:err.message});
                    res.status(200).jsonp(proyecto);
                })
            });
        }
    });
};

/**
 * Eliminar registro proyecto de "base de datos";
 */
exports.deleteProyecto = function(req, res, next){
    console.log('DELETE /proyectos/:id');
    console.log(req.params.id);

    Proyectos.findByIdAndRemove(req.params.id).populate('colaborador').exec(function (err, proyecto) {
        if(err){
            res.status(500).jsonp({error:'500', descrip:'Recurso no existente'});
        }else{
            res.status(200).jsonp(proyecto);
        }
    });
};