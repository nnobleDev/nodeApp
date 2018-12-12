const express = require('express');
const router = express.Router();


const Incidencia = require('../models/Incidencia');
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

module.exports = router;