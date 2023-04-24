import { Link, useNavigate } from "react-router-dom";
import usePeliculas from "../hooks/usePeliculas";
import { useEffect, useState } from "react";
import clienteAxios from "../helpers/clienteAxios";
import Swal from "sweetalert2";

const MiPerfil = () => {
  const navigate = useNavigate();
  const { usuarioLogeado, setUsuarioLogeado, agregarEliminarFavorito } =
    usePeliculas();

  const [pelisFav, setPelisFav] = useState({});
  const [refrescar, setRefrescar] = useState(false);

  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const respuesta = await clienteAxios.get(
          `/usuarios/obtener-peliculas-favoritas/${usuarioLogeado.id}`
        );
        setPelisFav(respuesta.data);
        setRefrescar(!refrescar);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.msg || error,
        });
      }
    };

    if (usuarioLogeado.id) obtenerPeliculas();
  }, [usuarioLogeado.id, usuarioLogeado.peliculasFavoritas]);

  const eliminarCuenta = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "¿Estás seguro de eliminar tu cuenta?",
        text: "Una vez eliminada no se podrá recuperar nada",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Borrar",
      }).then((result) => {
        if (result.isConfirmed) {
          clienteAxios
            .delete(`/usuarios/eliminar-usuario/${usuarioLogeado.id}`)
            .then((data) => {
              //* Vaciar las variables.
              localStorage.removeItem("token");
              setUsuarioLogeado({});
              Swal.fire("¡Cuenta Borrada!", data.data.msg, "success");
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.msg || error,
              });
            });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.msg || error,
      });
    }
  };

  return (
    <div className="flex-1 self-center flex flex-col justify-center items-start px-2 movilS:p-2 tablet:py-5 border rounded-lg gap-1 movilS:w-11/12 tablet:w-11/12">
      <h1 className="self-center text-3xl font-bold mb-3">Mi Perfil</h1>
      <div className="text-left w-full flex justify-center items-center movilS:flex-col tablet:flex-row">
        <div className="movilS:w-full tablet:w-6/12">
          <p className="text-2xl uppercase">Nombre: {usuarioLogeado.nombre}</p>
          <p className="text-2xl">NICKNAME: {usuarioLogeado.nickname}</p>
          <p className="text-2xl">EMAIL: {usuarioLogeado.email}</p>
        </div>

        <div className="movilS:mt-5 tablet:mt-0 flex movilS:flex-col gap-2 movilS:w-full tablet:w-5/12 laptop:w-3/12 desktop:w-2/12">
          <Link to="/editar-perfil">
            <button className="w-full uppercase text-lg px-2 py-3 font-bold rounded-full text-white bg-blue-600">
              Editar perfil
            </button>
          </Link>

          <button
            className="w-full uppercase text-lg px-2 py-3 font-bold rounded-full text-white bg-red-500"
            onClick={eliminarCuenta}
          >
            Eliminar cuenta
          </button>
        </div>
      </div>

      <div className="w-full flex-1 flex movilS:flex-col tablet:flex-row tablet:flex-wrap justify-center items-center gap-4 px-2">
        {pelisFav.peliculasFavoritas?.map((pelicula) => (
          <div
            key={pelicula._id}
            className="movilS:w-9/12 movilL:w-8/12 tablet:w-3/12 laptop:w-2/12 desktop:w-2/12 flex flex-col justify-between"
          >
            <div className="flex flex-row-reverse justify-between items-center">
              {usuarioLogeado.peliculasFavoritas?.includes(pelicula._id) ? (
                <button
                  className="text-2xl"
                  onClick={() =>
                    agregarEliminarFavorito(true, {
                      idPelicula: pelicula._id,
                      idUsuario: usuarioLogeado.id,
                    })
                  }
                >
                  <i className="fa-solid fa-heart text-red-600" />
                </button>
              ) : (
                <button
                  className="text-2xl"
                  onClick={() =>
                    agregarEliminarFavorito(false, {
                      idPelicula: pelicula._id,
                      idUsuario: usuarioLogeado.id,
                    })
                  }
                >
                  <i className="fa-regular fa-heart text-red-600" />
                </button>
              )}

              <p className="font-bold my-2">
                Puntuación:{" "}
                <span className="block">
                  <i
                    className={`fa-star ${
                      pelicula.valoracion >= 1 ? "fa-solid" : "fa-regular"
                    }`}
                  />
                  <i
                    className={`fa-star ${
                      pelicula.valoracion >= 2 ? "fa-solid" : "fa-regular"
                    }`}
                  />
                  <i
                    className={`fa-star ${
                      pelicula.valoracion >= 3 ? "fa-solid" : "fa-regular"
                    }`}
                  />
                  <i
                    className={`fa-star ${
                      pelicula.valoracion >= 4 ? "fa-solid" : "fa-regular"
                    }`}
                  />
                  <i
                    className={`fa-star ${
                      pelicula.valoracion >= 5 ? "fa-solid" : "fa-regular"
                    }`}
                  />
                </span>
              </p>
            </div>
            <Link to={`/pelicula/${pelicula._id}`}>
              <img
                src={`http://localhost:5000/${pelicula.fotoPortada}`}
                alt={`Foto: ${pelicula.fotoPortada}`}
                className="w-full"
              />

              <h2 className="h-16 overflow-hidden">
                {pelicula.nombrePelicula}
              </h2>

              <p className="px-3 py-2 bg-gray-200 dark:bg-gray-900 rounded-full border-none font-bold">
                {pelicula.generos.map((genero, index) =>
                  genero.concat(index < pelicula.generos.length - 1 ? ", " : "")
                )}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiPerfil;
