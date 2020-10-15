const Proyectos = require("../models/Proyectos") 
const Tareas = require("../models/Tareas") 

exports.agreagarTarea = async (req,resp,next)=>{

    const proyecto = await Proyectos.findOne({ where : {url : req.params.url}})
    // leer el valor del body
    const tarea = req.body.tarea
    //estado 0 = imcompleto y id del proyecto
    const estado = 0
    const proyectoId = proyecto.id
    //Inseratar en la base de datos
    const resultado = await Tareas.create({tarea, estado , proyectoId })
    if(!resultado){
        return next()
    }

    // redireccinar
    console.log('///////////////////////////////////////////////////////////////')
    console.log(req.body.tarea)

    resp.redirect(`/proyectos/${req.params.url}`);

}

// cambiar el estado de la tarea
exports.cambiarEstadoTarea = async (req,resp,next)=>{
    //estado 0 = tarea incompleta .
    //estado > 0 tarea Completa
    
    const {id} = req.params;
    const tarea = await Tareas.findOne({
        where:{
            id
        }
    });

    //cambiar el estado
    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1
    };
    tarea.estado = estado;

    const resultado = await tarea.save()
    if(!resultado) return next();

    resp.status(200).send('todoBien...')
}

// buscar y eliminar la tarea
exports.eliminarTarea = async(req, resp, next) =>{
    let {idTarea} = req.query;


    // Eliminar de forma permanente
    const resultado = await Tareas.destroy({
        where: { id:idTarea}
    });
    if(!resultado) return next();

    resp.status(200).send('Tarea Eliminada')
}