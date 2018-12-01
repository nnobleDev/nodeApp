const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/', async(req, res)=>{
  const notes= await Note.find().sort({date:'desc'});
  res.render('index',{notes});
});

router.get('/about', (req,res)=>{
  res.render('about')
});
module.exports = router;
