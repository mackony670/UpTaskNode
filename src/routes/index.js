const express = require('express');
const router = express.Router();
const validator = require('express-validator');



// importar el controlador de la vista
const proyectoController = require('../controller/proyectosController');
const tareaController = require('../controller/tareaController');
const usuariosController = require('../controller/usuariosController');
const authController = require('../controller/authController');




module.exports = function () {
    //vistas para el home
    router.get(
        '/',
        authController.usurioAutenticado,
        proyectoController.Home
    );

    router.get(
        '/nuevo-proyecto',
        authController.usurioAutenticado,
        proyectoController.formulario_proyecto
    );

    router.post(
        '/nuevo-proyecto',
        authController.usurioAutenticado,
        validator.body('nombre').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto
    );

    //listar proyectos
    router.get(
        '/proyectos/:url',
        authController.usurioAutenticado,
        proyectoController.proyectoUrl
    );

    //Actualizaar el proyecto
    router.get(
        '/proyecto/editar/:id',

        authController.usurioAutenticado,
        proyectoController.formularioEditar


    );
    router.post(
        '/nuevo-proyecto/:id',

        authController.usurioAutenticado,
        validator.body('nombre').not().isEmpty().trim().escape(),
        proyectoController.actualizarProyecto
    );
    //eliminar el proyecto
    router.delete(
        '/proyectos/:url',

        authController.usurioAutenticado,
        proyectoController.proyectoEliminar
    );

    /*
    --------------------------------------------------------
                tareas
    */
    //    ingresar-nueva tara
    router.post(
        '/proyectos/:url',

        authController.usurioAutenticado,
        tareaController.agreagarTarea
    );
    // actualizar Tarea
    router.patch(
        '/tareas/:id',

        authController.usurioAutenticado,
        tareaController.cambiarEstadoTarea
    );
    // eliminar Tarea
    router.delete(
        '/tareas/:id',
        authController.usurioAutenticado,
        tareaController.eliminarTarea
    );
    /*
    --------------------------------------------------------
                usuarios
    */
    router.get(
        '/crear-cuenta',
        usuariosController.FormCrearUsuario
    );
    // crear cuenta
    router.post(
        '/crear-cuenta',
        usuariosController.crearCuenta
    );
    // iiciar session
    router.get(
        '/iniciar-sesion',
        usuariosController.FormIniciarSession
    )
    router.post(
        '/iniciar-session',
        authController.autenticarUsuario
    )
    // cerrar la session
    router.get(
        '/cerrar-session',
        authController.cerrarSesion
    )
    return router;

}