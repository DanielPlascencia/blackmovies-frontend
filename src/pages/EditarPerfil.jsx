import { useEffect, useState } from "react";
import usePeliculas from "../hooks/usePeliculas";
import clienteAxios from "../helpers/clienteAxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const { usuarioLogeado, refrescar, setUsuarioLogeado, setRefrescar } =
    usePeliculas();
  const [datosActualizados, setDatosActualizados] = useState({});

  useEffect(() => {
    setDatosActualizados(usuarioLogeado);
  }, [usuarioLogeado]);

  const obtenerDatos = (e) => {
    setDatosActualizados({
      ...datosActualizados,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarPerfil = async (e) => {
    e.preventDefault();
    const nombre = datosActualizados.nombre;

    let password = "";
    if (datosActualizados.password?.length > 0) {
      password = datosActualizados.password;
    }

    try {
      const { data } = await clienteAxios.put(
        `/usuarios/actualizar-usuario/${datosActualizados.id}`,
        { nombre, password } // Convertirlo en un objeto
      );
      console.log(data.msg);
      Swal.fire("¡Cuenta Actualizada!", data.msg, "success");
      navigate("/");

      datosActualizados.password = "";
      setDatosActualizados(datosActualizados);

      usuarioLogeado.nombre = datosActualizados.nombre;
      setUsuarioLogeado(usuarioLogeado);

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

  return (
    <div className="flex-1 self-center flex flex-col justify-start items-start px-2 movilS:p-2 tablet:py-5 border rounded-lg gap-1 movilS:w-11/12 tablet:w-11/12">
      <h1 className="self-center text-3xl font-bold mb-3">Editar Mi Perfil</h1>
      <div className="text-left w-full flex justify-center items-center movilS:flex-col tablet:flex-row">
        <form
          className="movilS:w-full tablet:w-6/12"
          onSubmit={actualizarPerfil}
        >
          <p className="text-3xl uppercase text-center">
            {usuarioLogeado.nickname}
          </p>

          <div className="my-5">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="movilS:w-full tablet:w-11/12 mb-4 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
              onChange={obtenerDatos}
              value={datosActualizados.nombre ? datosActualizados.nombre : ""}
            />

            <input
              type="password"
              name="password"
              placeholder="Nuevo password"
              className="movilS:w-full tablet:w-11/12 px-2 py-1 outline-none bg-white dark:bg-black border-b-black dark:border-b-white placeholder:text-gray-900 dark:placeholder:text-gray-200 border-b-2"
              onChange={obtenerDatos}
              value={
                datosActualizados.password ? datosActualizados.password : ""
              }
            />
          </div>

          <input
            type="submit"
            value="Actualizar Cuenta"
            className="w-full uppercase font-bold py-2 px-3 rounded-full cursor-pointer border text-white dark:text-black bg-black dark:bg-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white"
          />
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
