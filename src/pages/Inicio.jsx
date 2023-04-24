import { Link } from "react-router-dom";
import usePeliculas from "../hooks/usePeliculas";
import Paginacion from "../components/Paginacion";

const Inicio = () => {
  const {
    usuarioLogeado,
    guardarPeliculas,
    paginas,

    setNumeroPagina,

    agregarEliminarFavorito,
  } = usePeliculas();

  const cambiarPagina = (pagina) => {
    setNumeroPagina(pagina);
  };

  return (
    <>
      <div className="w-full flex-1 flex movilS:flex-col tablet:flex-row justify-center items-center gap-4 px-2">
        {guardarPeliculas.docs?.map((pelicula) => (
          <div
            key={pelicula._id}
            className="movilS:w-9/12 movilL:w-8/12 tablet:w-3/12 laptop:w-5/12 desktop:w-2/12 flex flex-col justify-between"
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
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  pelicula.fotoPortada
                }`}
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

      <div>
        {guardarPeliculas?.prevPage ? (
          <button onClick={() => cambiarPagina(guardarPeliculas.prevPage)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        ) : null}

        {guardarPeliculas?.totalPages <= 3 ? (
          <>
            {paginas.map((pagina) => (
              <Paginacion key={pagina} pagina={pagina} />
            ))}
          </>
        ) : (
          <>
            {guardarPeliculas?.page === 1 ? null : <Paginacion pagina={1} />}
            <Paginacion pagina={guardarPeliculas?.page} />
            {guardarPeliculas?.page === guardarPeliculas?.totalPages ? null : (
              <Paginacion pagina={guardarPeliculas?.totalPages} />
            )}
          </>
        )}

        {guardarPeliculas?.nextPage ? (
          <button onClick={() => cambiarPagina(guardarPeliculas.nextPage)}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Inicio;
