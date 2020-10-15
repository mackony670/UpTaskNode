import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.getElementById("eliminar-proyecto");
//document.getElementById('eliminar-proyecto');

btnEliminar &&
  btnEliminar.addEventListener("click", (e) => {
    const proyectourl = e.target.dataset.proyectoUrl;

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
        //enviar la olicitud para eliminar el proyecto
        const url = `${location.origin}/proyectos/${proyectourl}`;

        axios
          .delete(url, { params: { proyectourl } })
          .then((respuesta) =>Swal.fire("Borrado!", respuesta.data,"success"))
          .catch(()=>{
            Swal.fire({
              type  : 'error',
              title : 'Hubo un error',
              text  : 'El proyecto no se pudo eliminar' 
            })
          })
        //redirigir
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    });
  });

export default btnEliminar;
