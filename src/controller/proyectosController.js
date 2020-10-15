const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.Home = async (req, resp) => {
  const proyectos = await Proyectos.findAll();
  resp.render("index", {
    nombrePagina: "proyectos ",
    proyectos,
  });
};

exports.formulario_proyecto = async (req, resp) => {
  const proyectos = await Proyectos.findAll();
  resp.render("nuevoProyecto", {
    nombrePagina: "Crear un proyecto",
    proyectos,
  });
};

exports.nuevoProyecto = async (req, resp) => {
  const proyectos = await Proyectos.findAll();

  //enviar a la consola lo ue el usuario escriba
  //console.log(req.body)

  // validar que halla algo en el input
  const { nombre } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({
      texto: "ingrese un nombre al proyecto",
    });
  }

  //si hay errores
  if (errores.length > 0) {
    resp.render("nuevoProyecto", {
      nombrePagina: "Crear un proyecto",
      errores,
      proyectos,
    });
  } else {
    //si llega aca es por que no hay errores
    //por ende hay que insertar en la BD
    await Proyectos.create({ nombre });
    resp.redirect("/");
  }
};

//listar proyecto
exports.proyectoUrl = async (req, resp, next) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  //consultar tareas del proyecto actual
  const tareas = await Tareas.findAll({
    where:{proyectoId: proyecto.id}
  })


  if (!proyecto) return next();

  // console.log(proyecto)

  resp.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyectos,
    proyecto,
    tareas
  });
};

exports.formularioEditar = async (req, resp, next) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  resp.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto,
  });
};
exports.actualizarProyecto = async (req, resp) => {
  0;
  const proyectos = await Proyectos.findAll();

  //enviar a la consola lo ue el usuario escriba
  //console.log(req.body)

  // validar que halla algo en el input
  const { nombre } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({
      texto: "ingrese un nombre al proyecto",
    });
  }

  //si hay errores
  if (errores.length > 0) {
    resp.render("nuevoProyecto", {
      nombrePagina: "Crear un proyecto",
      errores,
      proyectos,
    });
  } else {
    //si llega aca es por que no hay errores
    //por ende hay que insertar en la BD
    await Proyectos.update(
      { nombre },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    resp.redirect("/");
  }
};
exports.proyectoEliminar = async (req, resp, next) => {
  try {
    //req, query o params
    // const {proyectourl} = ;
    // console.log(proyectourl)
    await Proyectos.destroy({
      where: { url: req.query.proyectourl },
    });
    resp.status(200).send("Proyecto Eliminado");
  } catch (error) {
    next();
  }
};
