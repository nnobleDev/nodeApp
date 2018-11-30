const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email,password, done)=>{
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, { message: ' Usuario no encontrado'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user );
        }else{
            return done(null, false, {message: 'Contraseña erronea!'});
        }
    }
}));

//almacenamos el usuario en una sesion
passport.serializeUser((user, done)=>{
    done(null, user.id); //guardamos el id del usuario
});

//Generamos un usuario con el id 
passport.deserializeUser((id, done)=>{
    User.findById(id,(err,user)=>{ //consultamos la base de datos buscando el usuario
        done(err, user); //retronamos error si lo hay o el usuario encontrado
    });
});