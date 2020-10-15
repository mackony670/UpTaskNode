import axios from "axios";
import Swal from "sweetalert2"

import {actualizarAvance} from '../funciones/avance';
const tareas = document.getElementById('listado-pendientes');


if (tareas) {
    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icon = e.target;
            const idTarea = icon.parentElement.parentElement.dataset.tarea;

            //request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`

            axios.patch(url, { idTarea })
                .then(function (response) {
                    if (response.status === 200) {
                        icon.classList.toggle('completo')
                        actualizarAvance();
                    }
                })


        }
        if (e.target.classList.contains('fa-trash')) {
            const tareaHtml = e.target.parentElement.parentElement;
            const idTarea = tareaHtml.dataset.tarea;
            // preguntar si se desea eliminar la terea
            Swal.fire({
                title: "Estas Seguro?",
                text: "Esta accion no podra revertirse!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminalo!",
                cancelButtonText: "cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    // proceder a eliminar la terea
                    const url = `${location.origin}/tareas/${idTarea}`
                    axios.delete(url, {
                        params: { idTarea }
                    }).then((respuesta) => {
                        if (respuesta.status === 200) {
                            // eliuminar el nodo
                            tareaHtml.parentElement.removeChild(tareaHtml);
                            // opcional una alerta
                            Swal.fire(
                                'Eliminando Tarea',
                                respuesta.data,
                                'success'
                            )
                            actualizarAvance();
                        }
                        if(tareas.children[0].childElementCount === 0){
                            tareas.children[0].innerHTML= '<h2>Agregue una tarea a realizar</h2>'
                        }
                    })

                }

            })
        }
    })
}



export default tareas;