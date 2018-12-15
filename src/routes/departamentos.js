const express = require('express');
const router = express.Router();


const Departamento = require('../models/Departamento');
const {isAuthenticated} = require('../helpers/auth');

//FORMULARIO PARA REGISTRAR DEPARTAMENTO
router.get('/departamento/new',isAuthenticated, (req,res)=>{
    res.render('departamento/new');
    //res.send('ok')
});

//REGISTRAR EL DEPARTAMENTO
router.post('/departamento/new',isAuthenticated,async(req,res)=>{
    //console.log(req.body);
    const {nombre, descripcion}=req.body;
    const errors=[];
    if(!nombre){
        errors.push({text:'Ingrese el nombre del departamento!'});
    }
    if(!descripcion){
        errors.push({text:'Ingrese descripcion del departamento!'});
    }
    if(errors.length >0){
        res.render('departamento/new', {errors, nombre, descripcion});
    }else{
        const newDto = new Departamento({nombre, descripcion});
        await newDto.save();
        console.log(newDto);
        req.flash('success_msg','Departamento creado correctamente');
        res.redirect('/departamento/new');
    }
});


module.exports = router;