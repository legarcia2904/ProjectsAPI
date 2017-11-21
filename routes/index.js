var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();
var models = require('../models/Proyecto');
var modelsAutor = require('../models/Colaborador');
var proyectosCtrl = require('../controllers/ProyectosController');
var colaboradoresCtrl = require('../controllers/ColaboradoresController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/proyectos')
  .get(proyectosCtrl.getProyectos) //Devuelve todos los proyectos
  .post(upload.array(), proyectosCtrl.addProyecto); //Crea un nuevo proyectos

router.route('/proyectos/:id')
  .get(proyectosCtrl.getById) //Devuelve el proyecto con el ID indicado.
  .put(upload.array(), proyectosCtrl.updateProyecto) //Actualiza el proyecto con el ID indicado.
  .delete(proyectosCtrl.deleteProyecto); //Elimina el proyecto con el ID indicado.

router.route('/colaboradores')
  .get(colaboradoresCtrl.getColaboradores) //Devuelve todos los colaboradores
  .post(upload.array(), colaboradoresCtrl.addColaborador); //Crea un nuevo Colaborador

router.route('/colaboradores/:id')
  .get(colaboradoresCtrl.getById) //Devuelve los datos del colaborador y todos los proyectos en los que participa.
  .put(upload.array(), colaboradoresCtrl.updateColaborador) //Actualizar el colaborador con el ID indicado.
  .delete(colaboradoresCtrl.deleteColaborador); //Eliminar el colaborador con el ID indicado.

router.route('/colaboradores/:id/proyectos')
    .get(colaboradoresCtrl.getProyectosPorColaborador); //Devuelve todos los proyectos en los que participa el colaborador identificado con ID

module.exports = router;
