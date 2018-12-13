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
router.post('/departamento/new',isAuthenticated,(req,res)=>{
    console.log(req.body)
});


module.exports = router;