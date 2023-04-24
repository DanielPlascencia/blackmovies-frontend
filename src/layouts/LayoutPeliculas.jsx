import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import clienteAxios from "../helpers/clienteAxios";
import usePeliculas from "../hooks/usePeliculas";
import Buscar from "../components/Buscar";
import Swal from "sweetalert2";

const LayoutPeliculas = () => {
  const {
    numeroPagina,
    paginas,
    guardarPeliculas,
    token,
    usuarioLogeado,
    refrescar,

    setPaginas,
    setGuardarPeliculas,
    setToken,
    setUsuarioLogeado,
  } = usePeliculas();

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    const obtenerUsuario = async () => {
      try {
        const respuesta = await clienteAxios.post(
          "/usuarios/decodificar-token",
          { token }
        );
        setUsuarioLogeado(respuesta.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "OCURRIÓ UN ERROR",
          text: error.response.data.msg,
        });
      }
    };

    if (token?.length > 0) obtenerUsuario();
  }, [token]);

  useEffect(() => {
    const obtenerPeliculasFavoritas = async () => {
      const id = usuarioLogeado.id;

      try {
        const respuesta = await clienteAxios.post("/usuarios/obtener-usuario", {
          id,
        });

        usuarioLogeado.peliculasFavoritas = respuesta.data.peliculasFavoritas;
        setUsuarioLogeado(usuarioLogeado);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "OCURRIÓ UN ERROR",
          text: error,
        });
      }
    };
    if (Object.keys(usuarioLogeado).length > 0) {
      obtenerPeliculasFavoritas();
    }
  }, [usuarioLogeado, refrescar]);

  useEffect(() => {
    setPaginas([]);
    const obtenerPeliculas = async () => {
      try {
        const respuesta = await clienteAxios.get(
          `/peliculas/mostrar-peliculas/${numeroPagina}`
        );
        setGuardarPeliculas(respuesta.data);
      } catch (error) {
        console.log(error.response?.data.msg);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data.msg,
        });
      }
    };

    obtenerPeliculas();
  }, [numeroPagina]);

  useEffect(() => {
    try {
      for (let i = 1; i <= guardarPeliculas?.totalPages; i++) {
        paginas.push(i);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: { error },
      });
    }
  }, [guardarPeliculas.totalPages, paginas]);

  return (
    <div className="flex flex-col justify-between items-center w-full min-h-screen text-center">
      <Header />{" "}
      <div className="w-full flex-1 self-start my-3 flex flex-col gap-3">
        <Buscar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutPeliculas;
