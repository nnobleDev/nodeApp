const express = require('express');
const router = express.Router();


const Incidencia = require('../models/Incidencia');
const Registro = require('../models/Registro');
const {isAuthenticated} = require('../helpers/auth');


//LISTADO DE INCIDENCIAS
router.get('/incidencias/all-incidencias',isAuthenticated, (req,res)=>{
    res.render('incidencias/all-incidencias');
});

//FORMULARIO PARA CREAR NUEVO TIPO
router.get('/incidencias/new-incidencia',isAuthenticated, (req,res)=>{
    res.render('incidencias/new-tipo');
});

//REGISTRAR NUEVO TIPO
router.post('/incidencias/new-tipo',isAuthenticated, async(req,res)=>{
    console.log(req.body);
    const {tipo , descripcion}=req.body;
    const errors=[];
    if(!tipo){
        errors.push({text:'El campo Tipo no puede estar vacio'});
    }
    if(!descripcion){
        errors.push({text:'El campo Descripcion no puede estar vacio'});
    }
    if(errors.length > 0){
        res.render('incidencias/new-tipo',{
            errors,tipo,descripcion
        })
    }else{
       const newTipo= new Incidencia({tipo,descripcion});
       console.log(newTipo);
       await newTipo.save();
       req.flash('success_msg','Nuevo tipo registrado');
       res.redirect('/incidencias/all-incidencias');
    }
});


//FORMULARIO PARA REGISTRAR NUEVA INCIDENCIA
router.get('/incidencias/registro-incidencia',isAuthenticated, async(req,res)=>{
    const tipos = await Incidencia.find().sort({tipo:'asc'});
    res.render('incidencias/registro-incidencia', {tipos});
    //console.log(tipos);
});

router.post('/incidencias/registro-incidencia',isAuthenticated, async(req,res)=>{
    //console.log(req.body);
    //res.json(req.body);
    const {tipo, descripcion, departamento} = req.body;
    const errors =[];
    if(!descripcion){
        errors.push({text:'Ingrese la descripcion del problema'});
    }
    if(errors.length >0 ){
        const tipos = await Incidencia.find().sort({tipo:'asc'});
        res.render('incidencias/registro-incidencia',{errors, tipos});
    }else{
        req.flash('success_msg', 'Incidencia registrada');
        const newInc = new Registro({tipo,descripcion,departamento});
        newInc.usuario = req.user.id;
        newInc.estado = 'active';
        await newInc.save();
        //console.log(newInc);
        res.redirect('/incidencias/registro-incidencia');
    }
   });

module.exports = router;