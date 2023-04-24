//! IMPORTAR DEPENDENCIAS --
import { BrowserRouter, Route, Routes } from "react-router-dom";

//! IMPORTAR LAYOUT --
import LayoutPeliculas from "./layouts/LayoutPeliculas";

//! IMPORTAR CONTEXT --
import { PeliculasProvider } from "./context/PeliculasProvider";

//! IMPORTAR PÁGINAS --
import Inicio from "./pages/Inicio";
import IniciarSesion from "./pages/IniciarSesion";
import RegistrarCuenta from "./pages/RegistrarCuenta";
import Pelicula from "./pages/Pelicula";
import NotFound from "./pages/NotFound";
import MiPerfil from "./pages/MiPerfil";
import EditarPerfil from "./pages/EditarPerfil";
import VerPelicula from "./pages/VerPelicula";

//! IMPORTAR COMPONENTES --

function App() {
  return (
    <BrowserRouter>
      <PeliculasProvider>
        <Routes>
          <Route element={<LayoutPeliculas />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/registrar-cuenta" element={<RegistrarCuenta />} />
            <Route path="/pelicula/:id" element={<Pelicula />} />
            <Route path="/ver-pelicula/:id" element={<VerPelicula />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </PeliculasProvider>
    </BrowserRouter>
  );
}

export default App;
