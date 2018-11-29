const express = require('express');
const router = express.Router();

const User = require('../models/User')
router.get('/users/signin', (req, res)=>{
  res.render('users/signin');
});
///////////////////////////////////////

router.get('/users/signup', (req, res)=>{
  res.render('users/signup');
});
router.post('/users/signup', async (req,res)=>{
  //console.log(req.body);
  const {name, email, password, confirm_password} = req.body;
  const errors=[];
  if(name.length <= 0){
    errors.push({text: 'Ingresa un nombre'});
  }
  if(email.length<=0){
    errors.push({text:'Ingrese email'});
  }
  if(password!=confirm_password){
    errors.push({text: 'No coinciden las contraseñas'});
  }
  if(password.length < 4){
    errors.push({text: 'La contraseña debe tener mas de 4 caracteres'});
  }
  if (errors.length > 0){
    res.render('users/signup', {errors,name,email,password,confirm_password})
  }else{
    //res.send('ok');
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    req.flash('success_msg','Usuario registrado');
    res.redirect('/users/signin');
  }

});
module.exports = router;
