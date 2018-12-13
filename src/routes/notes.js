const express = require('express');
const router = express.Router();


const Note = require('../models/Note');
const {isAuthenticated} = require('../helpers/auth');


router.get('/notes/add',isAuthenticated, (req, res)=>{
  res.render('notes/new-note');
});

router.get('/notes',isAuthenticated, async(req, res)=>{
  const notes= await Note.find({user : req.user.id}).sort({date:'desc'});
  res.render('notes/all-notes', { notes });
});

router.post('/notes/new-note',isAuthenticated,async(req, res)=>{
  console.log(req.body);
  //res.send('ok');
  const {title, description }= req.body;
  const errors =[];
  if(!title){
    errors.push({text:'Ingrese el titulo'});
  }
  if(!description){
    errors.push({text: 'Ingrese descripcion'});
  }
  if(errors.length > 0){
    res.render('notes/new-note', {
      errors,
      title,
      description
    });
  }else{
    const newNote= new Note({title, description});
    console.log(newNote);
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg','Nota agregada');
    res.redirect('/notes');
  }
});


router.get('/notes/edit/:id',isAuthenticated, async(req,res)=>{
  const note= await Note.findById(req.params.id);
  res.render('notes/edit-note',{note});
});
router.put('/notes/edit-note/:id',isAuthenticated,async(req,res)=>{
  const {title, description}= req.body;
  await Note.findByIdAndUpdate(req.params.id,{title, description});
  req.flash('success_msg','Nota editada correctamente');
  res.redirect('/notes');

});

router.delete('/notes/delete/:id',isAuthenticated, async(req,res)=>{
  console.log(req.params.id);
  //res.send('ok');
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg','Nota eliminada correctamente');
  res.redirect('/notes');

})

module.exports = router;
