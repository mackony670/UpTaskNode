const passport = require('passport');


exports.autenticarUsuario =passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Faltan las credenciales'
    
})

// funcion para ver si el usuario esta logueado si o no

exports.usurioAutenticado = (req, resp, next)=>{
    // si esta autenticado go
    if(req.isAuthenticated()){
        return next()
    }
    // sinop redirigir
    return resp.redirect('/iniciar-sesion')
}

// funcion para cerra la sesion
exports.cerrarSesion = (req, resp) =>{
    req.session.destroy(()=>{
        resp.redirect('/iniciar-sesion')
    })
} 