import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../helpers/clienteAxios";

const RegistrarCuenta = () => {
  const navigate = useNavigate();

  const [guardarDatos, setGuardarDatos] = useState({});
  let msgError = "";

  const registrarCuenta = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.post(
        "/usuarios/agregar-usuario",
        guardarDatos
      );

      Swal.fire({
        icon: "success",
        title: respuesta.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/iniciar-sesion");
    } catch (error) {
      const obtenerErrores =
        error.response.data.length > 1
          ? error.response.data.map((error, index) =>
              error.msg.concat(index < error.msg.length - 1 ? ", " : "")
            )
          : error.response.data;

      obtenerErrores.length > 1
        ? obtenerErrores.map((error) => (msgError += error))
        : (msgError = obtenerErrores.msg);

      Swal.fire({
        icon: "error",
        title: "OCURRIÓ UN ERROR",
        text: msgError,
      });
    }
    msgError = "";
  };

  const obtenerDatos = async (e) => {
    setGuardarDatos({
      ...guardarDatos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="self-center flex-1 my-2 mx-3 px-2 py-2 border-2 border-gray-800 dark:border-gray-200 rounded-2xl movilS:w-11/12 tablet:w-96 flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Registrarme</h1>
      <form
        autoComplete="off"
        className="my-7 w-full h-full flex flex-col justify-center items-center gap-5"
        onSubmit={registrarCuenta}
      >
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <input
            type="text"
            name="nombre"
            placeholder="Escribe tu nombre"
            className="movilS:w-full tablet:w-11/12 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
            onChange={obtenerDatos}
          />
          <input
            type="text"
            name="nickname"
            placeholder="Escribe tu nickname"
            className="movilS:w-full tablet:w-11/12 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
            onChange={obtenerDatos}
          />
          <input
            type="email"
            name="email"
            placeholder="Escribe tu email"
            className="movilS:w-full tablet:w-11/12 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
            onChange={obtenerDatos}
          />
          <input
            type="password"
            name="password"
            placeholder="Escribe tu password"
            className="movilS:w-full tablet:w-11/12 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
            onChange={obtenerDatos}
          />
          <input
            type="password"
            name="repassword"
            placeholder="Escribe otra vez tu password"
            className="movilS:w-full tablet:w-11/12 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
            onChange={obtenerDatos}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="w-full uppercase font-bold py-2 px-3 rounded-full cursor-pointer border text-white dark:text-black bg-black dark:bg-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white"
        />
      </form>
    </div>
  );
};

export default RegistrarCuenta;
