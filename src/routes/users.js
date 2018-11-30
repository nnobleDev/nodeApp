const express = require('express');
const router = express.Router();

const User = require('../models/User');
/////////////SIGNIN//////////////
const passport = require('passport');
router.get('/users/signin', (req, res)=>{
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash:  true
}));

///////////////////SIGNUP////////////////////

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
    const emailUser = await User.findOne({email: email});
    if(emailUser){
      req.flash('error_msg','Email ya registrado');
      res.redirect('/users/signup');
    }else{
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password)
      await newUser.save();
      req.flash('success_msg','Usuario registrado');
      res.redirect('/users/signin');
    }

  }

});

////////////LOGOUT///////////////

router.get('/users/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
});
module.exports = router;
