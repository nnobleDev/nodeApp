const express = require('express');
const router = express.Router();

const User = require('../models/Incidencia');

router.get('/all-incidencias', (req,res)=>{
    res.render('incidencias/all-incidencias');
});

module.exports = router;