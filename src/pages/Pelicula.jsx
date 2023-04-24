import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../helpers/clienteAxios";
import usePeliculas from "../hooks/usePeliculas";
import Comentarios from "../components/Comentarios";

const Pelicula = () => {
  const { id } = useParams();
  const { showModal, refrescar, setShowModal, formatearFecha } = usePeliculas();

  const [datosPelicula, setDatosPelicula] = useState({});

  useEffect(() => {
    const obtenerDatosPelicula = async () => {
      try {
        const respuesta = await clienteAxios.get(
          `/peliculas/mostrar-pelicula/${id}`
        );
        setDatosPelicula(respuesta.data);
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
  }, [refrescar]);

  return (
    <div
      className="flex-1"
      style={{
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("http://localhost:5000/${datosPelicula.fotoFondo}")`,
        backgroundPosition: "50% 0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col justify-between items-center gap-3">
        <div className="w-full flex movilS:flex-col tablet:flex-row justify-center items-center gap-4">
          <img
            src={`http://localhost:5000/${datosPelicula.fotoPortada}`}
            alt={datosPelicula.fotoPortada}
            className="w-fit movilS:h-36 movilL:h-40 tablet:h-56 laptop:h-96"
          />

          <div className="flex flex-col justify-center movilS:items-center tablet:items-start movilS:w-11/12 tablet:w-8/12">
            <h3 className="text-2xl font-bold">
              {datosPelicula.nombrePelicula}
            </h3>
            <p className="font-bold my-2">
              <span className="block">
                <i
                  className={`fa-star ${
                    datosPelicula.valoracion >= 1 ? "fa-solid" : "fa-regular"
                  }`}
                />
                <i
                  className={`fa-star ${
                    datosPelicula.valoracion >= 2 ? "fa-solid" : "fa-regular"
                  }`}
                />
                <i
                  className={`fa-star ${
                    datosPelicula.valoracion >= 3 ? "fa-solid" : "fa-regular"
                  }`}
                />
                <i
                  className={`fa-star ${
                    datosPelicula.valoracion >= 4 ? "fa-solid" : "fa-regular"
                  }`}
                />
                <i
                  className={`fa-star ${
                    datosPelicula.valoracion >= 5 ? "fa-solid" : "fa-regular"
                  }`}
                />
              </span>
            </p>
            <p>
              {datosPelicula?.fechaPelicula
                ? formatearFecha(datosPelicula.fechaPelicula)
                : "Cargando..."}
            </p>
            <p className="px-3 py-2 w-fit bg-gray-200 dark:bg-gray-900 rounded-full border-none font-bold">
              {datosPelicula.generos?.map((genero, index) =>
                genero.concat(
                  index < datosPelicula.generos.length - 1 ? ", " : ""
                )
              )}
            </p>
            <p className="text-start w-11/12 overflow-hidden">
              {datosPelicula.sinopsis}
            </p>
          </div>
        </div>

        <div className="w-full flex movilS:flex-col tablet:flex-row justify-center items-center gap-5">
          {datosPelicula?.comentarios &&
          Object.keys(datosPelicula.comentarios).length > 0 ? (
            <>
              <button
                className="bg-black text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Ver Comentarios
              </button>

              {showModal ? (
                <Comentarios comentarios={datosPelicula.comentarios} />
              ) : null}
            </>
          ) : (
            <p className="font-bold text-2xl">No hay comentarios</p>
          )}
          <Link
            to={`/ver-pelicula/${id}`}
            className="bg-white text-black active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Ver Pelicula
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pelicula;
