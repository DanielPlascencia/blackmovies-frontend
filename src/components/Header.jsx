import { Link, useNavigate } from "react-router-dom";
import usePeliculas from "../hooks/usePeliculas";
import Button from "./Button";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const { cambiarDarkMode, usuarioLogeado, setUsuarioLogeado } = usePeliculas();

  const cerrarSesion = () => {
    try {
      Swal.fire({
        icon: "success",
        title: `Adiós ${usuarioLogeado.nombre}`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");

      localStorage.removeItem("token");
      setUsuarioLogeado({});
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "OCURRIÓ UN ERROR",
        text: error,
      });
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 w-full flex justify-between items-center movilS:px-0 movilL:px-5 movilS:py-3">
      <Link to="/">
        <p className="font-bold w-full movilS:text-2xl tablet:text-5xl">
          BLACK <span className="text-black font-bold">MOVIES</span>
        </p>
      </Link>

      <div className="flex movilS:flex-col tablet:flex-row w-full justify-start items-center gap-1">
        <div className="flex-1 font-bold flex justify-center items-center gap-2 movilS:flex-col tablet:flex-row">
          {Object.keys(usuarioLogeado).length > 0 ? (
            <>
              <Link to="/mi-perfil">
                Hola: <Button texto={usuarioLogeado.nombre} tipo="primario" />
              </Link>

              <span onClick={cerrarSesion}>
                <Button texto="Cerrar Sesión" tipo="secundario" />
              </span>
            </>
          ) : (
            <>
              <Link to="/iniciar-sesion">
                <Button texto="Iniciar Sesión" tipo="primario" />
              </Link>

              <Link to="/registrar-cuenta">
                <Button texto="Registrarme" tipo="secundario" />
              </Link>
            </>
          )}
        </div>

        <button
          onClick={cambiarDarkMode}
          className="flex movilS:flex-row movilL:flex-col justify-center items-center gap-1"
        >
          <p className="font-bold">Tema</p>
          <i className="fa-solid fa-palette hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default Header;
