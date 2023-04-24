import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../helpers/clienteAxios";

const PeliculasContext = createContext();

const PeliculasProvider = ({ children }) => {
  const [guardarPeliculas, setGuardarPeliculas] = useState([]);
  const [numeroPagina, setNumeroPagina] = useState(1);
  const [paginas, setPaginas] = useState([]);
  const [token, setToken] = useState("");
  const [usuarioLogeado, setUsuarioLogeado] = useState({});
  const [refrescar, setRefrescar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalPeliculas, setShowModalPeliculas] = useState(false);

  const cambiarDarkMode = () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const agregarEliminarFavorito = async (esFavorito, datosPelicula) => {
    try {
      if (esFavorito === false) {
        await clienteAxios.post("/usuarios/agregar-favorito", datosPelicula);

        usuarioLogeado.peliculasFavoritas = [
          ...usuarioLogeado.peliculasFavoritas,
          datosPelicula.idPelicula,
        ];
        setUsuarioLogeado(usuarioLogeado);
        setRefrescar(!refrescar);
      } else {
        await clienteAxios.post("/usuarios/eliminar-favorito", datosPelicula);

        usuarioLogeado.peliculasFavoritas =
          usuarioLogeado.peliculasFavoritas.filter(
            (id) => id != datosPelicula.idPelicula
          );
        setUsuarioLogeado(usuarioLogeado);
        setRefrescar(!refrescar);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.msg || error,
      });
    }
  };

  const formatearFecha = (fecha) => {
    const fechaFormateada = fecha?.split("T");
    const nuevaFecha = fechaFormateada[0];
    return nuevaFecha;
  };

  return (
    <PeliculasContext.Provider
      value={{
        guardarPeliculas,
        numeroPagina,
        paginas,
        token,
        usuarioLogeado,
        refrescar,
        showModal,
        showModalPeliculas,

        setPaginas,
        setGuardarPeliculas,
        setNumeroPagina,
        setToken,
        setUsuarioLogeado,
        setRefrescar,
        setShowModal,
        setShowModalPeliculas,

        cambiarDarkMode,
        agregarEliminarFavorito,
        formatearFecha,
      }}
    >
      {children}
    </PeliculasContext.Provider>
  );
};

export { PeliculasProvider };
export default PeliculasContext;
