const passport = require('passport');
const locarStrategy = require('passport-local').Strategy;

// referencial
const Usuarios = require('../models/Usuarios')

// local strategy - login con credenciales propios (usaurios y clave)
passport.use(
    new locarStrategy(
        // por defautl espera un usurio y un pasword
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({ where: { email: email } })
                // si el usuario existe y el pasword es incorecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'password incorecto'
                    })
                }
                // el email y el pasword existe
                return done(null, usuario);
            } catch (error) {
                // ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )

)
// seriealizar el user
passport.serializeUser((usuario, callback)=>{
    callback(null, usuario )
})




// des-seriealizar el user
passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario)
})


// export
module.exports = passport;