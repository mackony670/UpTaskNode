const Usuarios = require('../models/Usuarios')


exports.FormCrearUsuario = async (req, resp, next) => {
    resp.render('crearCuenta', {
        nombrePagina: 'Crear Una Cuenta'
    });
};
exports.FormIniciarSession = async (req, resp, next) => {
  const {error} =resp.locals.mensajes;
    resp.render('iniciarSession', {
        nombrePagina: 'iniciar Session',
        error 
    });
};

exports.crearCuenta = async (req, resp, next) => {

    // leer los datos
    const { email, password, REpasword: REpassword } = req.body;
    const claveVerificar = require('../helpers/consultas')
    let errores = [];

    if (!claveVerificar.verificarClave(password, REpassword)) {
        errores.push({
            texto: "las contraseñas deben ser iguales y mayor a 6 digitos",
        });
    }

    //si hay errores
    if (errores.length > 0) {
        resp.render("crearCuenta", {
            nombrePagina: "Crear Una Cuenta",
            errores,
            email,
            password,
            REpassword
        });
    } else {
        // crear el usaurio
        try {
            await Usuarios.create({
                email,
                password
            })
            resp.status(200).redirect('/iniciar-sesion')
        } catch (error) {
            // console.log('1231321321321321')
            let errores = []
            let { message } = error.errors[0]
            errores.push({
                texto: message
            });
            resp.render("crearCuenta", {
                nombrePagina: "Crear Una Cuenta",
                errores,
                email,
                password,
                REpassword
            });
        }
    }
}
