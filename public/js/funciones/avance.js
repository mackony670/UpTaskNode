
import Swal from "sweetalert2"

export const actualizarAvance = () => {
    // seleccionar las tareas existentes
    const tareas = document.querySelectorAll('li.tarea')
    if (tareas.length) {
        // seleccionar las tareas completadas
        const tareasCompletas = document.querySelectorAll('i.completo')

        //calcular el avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);


        //mopstrar el avance
        const porcentaje = document.getElementById('porcentaje');

        porcentaje.style.width = avance+ '%';

        if(avance == 100){
            Swal.fire(
                'Felicidades',
                'Ya has completado el proyecto',
                'success'
            )
        }
    }


}