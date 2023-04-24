import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../helpers/clienteAxios";
import usePeliculas from "../hooks/usePeliculas";

const IniciarSesion = () => {
  const navigate = useNavigate();
  const [guardandoDatos, setGuardandoDatos] = useState({});
  const { setToken } = usePeliculas();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteAxios.post(
        "/usuarios/iniciar-sesion",
        guardandoDatos
      );

      const { token: tokenLS } = respuesta.data;
      localStorage.setItem("token", tokenLS);
      setToken(tokenLS);

      Swal.fire({
        icon: "success",
        title: respuesta.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "OCURRIÓ UN ERROR",
        text: error.response.data.msg,
      });
    }
  };

  const almacenarDatos = async (e) => {
    setGuardandoDatos({
      ...guardandoDatos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="self-center flex-1 my-2 mx-3 px-2 py-2 border-2 border-gray-800 dark:border-gray-200 rounded-2xl movilS:w-11/12 tablet:w-96 flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Iniciar Sesión</h1>
      <form
        autoComplete="off"
        className="my-7 w-full h-full flex flex-col justify-center items-center gap-5"
        onSubmit={iniciarSesion}
      >
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <input
            type="text"
            name="nickname"
            placeholder="Escribe tu nickname"
            className="movilS:w-full tablet:w-11/12 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
            onChange={almacenarDatos}
          />
          <input
            type="password"
            name="password"
            placeholder="Escribe tu password"
            className="movilS:w-full tablet:w-11/12 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
            onChange={almacenarDatos}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full uppercase font-bold py-2 px-3 rounded-full cursor-pointer border text-white dark:text-black bg-black dark:bg-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white"
        />
      </form>
    </div>
  );
};

export default IniciarSesion;
