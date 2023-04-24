import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../helpers/clienteAxios";
import ReactPlayer from "react-player";
import usePeliculas from "../hooks/usePeliculas";

const VerPelicula = () => {
  const { id } = useParams();
  const { usuarioLogeado } = usePeliculas();
  const [pelicula, setPelicula] = useState("");
  const [guardarDatos, setGuardarDatos] = useState({});

  useEffect(() => {
    const obtenerDatosPelicula = async () => {
      try {
        const respuesta = await clienteAxios.get(
          `/peliculas/mostrar-pelicula/${id}`
        );
        setPelicula(respuesta.data);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.msg || error,
        });
      }
    };

    obtenerDatosPelicula();
  }, []);

  const valorarPelicula = async (e) => {
    e.preventDefault();

    try {
      guardarDatos.usuario = usuarioLogeado.id;
      const respuesta = await clienteAxios.post(
        `/peliculas/valorar-pelicula/${id}`,
        guardarDatos
      );

      Swal.fire("¡Exito!", respuesta.data.msg, "success");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.msg || error,
      });
    }
  };

  const almacenandoDatos = (e) => {
    setGuardarDatos({
      ...guardarDatos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Link to={`/pelicula/${id}`} className="font-bold text-5xl">
        {pelicula.nombrePelicula}
      </Link>

      <div className="movilS:w-full tablet:w-fit">
        <ReactPlayer
          url={`http://localhost:5000/${pelicula.pelicula}`}
          controls
          light
          playing
          width="100%"
          height="100%"
        />
      </div>

      <div className="border rounded-md movilS:w-full tablet:w-4/6 flex flex-col justify-center items-center">
        <h3 className="font-bold text-2xl">Valorar Pelicula</h3>

        {Object.keys(usuarioLogeado).length ? (
          <form
            onSubmit={valorarPelicula}
            className="text-black dark:text-white flex flex-col justify-center items-center gap-3 w-full"
          >
            <div className="flex justify-center items-center gap-1">
              <div className="">
                <input
                  type="checkbox"
                  name="valoracion"
                  id="valoracion1"
                  value="1"
                  className="hidden"
                  onChange={almacenandoDatos}
                />
                <label
                  htmlFor="valoracion1"
                  className={`fa-star ${
                    guardarDatos.valoracion >= 1 ? "fa-solid" : "fa-regular"
                  }`}
                />
              </div>

              <div className="">
                <input
                  type="checkbox"
                  name="valoracion"
                  id="valoracion2"
                  value="2"
                  className="hidden"
                  onChange={almacenandoDatos}
                />
                <label
                  htmlFor="valoracion2"
                  className={`fa-star ${
                    guardarDatos.valoracion >= 2 ? "fa-solid" : "fa-regular"
                  }`}
                />
              </div>

              <div className="">
                <input
                  type="checkbox"
                  name="valoracion"
                  id="valoracion3"
                  value="3"
                  className="hidden"
                  onChange={almacenandoDatos}
                />
                <label
                  htmlFor="valoracion3"
                  className={`fa-star ${
                    guardarDatos.valoracion >= 3 ? "fa-solid" : "fa-regular"
                  }`}
                />
              </div>

              <div className="">
                <input
                  type="checkbox"
                  name="valoracion"
                  id="valoracion4"
                  value="4"
                  className="hidden"
                  onChange={almacenandoDatos}
                />
                <label
                  htmlFor="valoracion4"
                  className={`fa-star ${
                    guardarDatos.valoracion >= 4 ? "fa-solid" : "fa-regular"
                  }`}
                />
              </div>

              <div className="">
                <input
                  type="checkbox"
                  name="valoracion"
                  id="valoracion5"
                  value="5"
                  className="hidden"
                  onChange={almacenandoDatos}
                />
                <label
                  htmlFor="valoracion5"
                  className={`fa-star ${
                    guardarDatos.valoracion >= 5 ? "fa-solid" : "fa-regular"
                  }`}
                />
              </div>
            </div>

            <textarea
              name="texto"
              className="w-11/12 h-52 p-2 border border-black dark:border-white text-black"
              onChange={almacenandoDatos}
              placeholder="Escribe un comentario"
              required
            />

            <input
              type="submit"
              value="Valorar Pelicula"
              className="border rounded-full px-3 py-2 font-bold"
            />
          </form>
        ) : (
          <p className="uppercase font-bold my-7 text-red-500">
            Inicia sesion para valorar la pelicula
          </p>
        )}
      </div>
    </div>
  );
};

export default VerPelicula;
