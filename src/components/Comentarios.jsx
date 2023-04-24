import usePeliculas from "../hooks/usePeliculas";

const Comentarios = ({ comentarios }) => {
  const { setShowModal } = usePeliculas();

  return (
    // <!-- Main modal -->
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-black outline-none focus:outline-none h-96 movilS:w-72 tablet:w-11/12">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold uppercase">Comentarios</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black dark:text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black dark:text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto overflow-y-scroll w-full">
              {comentarios?.map((pelicula) => (
                <div
                  key={pelicula._id}
                  className="w-full text-start flex flex-col mb-3"
                >
                  <p className="font-bold text-2xl">
                    {pelicula.usuario.nickname}:
                  </p>
                  <p className="w-full">{pelicula.texto}</p>
                </div>
              ))}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Comentarios;

// datosPelicula.comentarios?.map((pelicula) => (
//   <div key={pelicula._id} className="border-2 border-red-600">
//     <p>{pelicula.usuario.nickname}</p>
//     <p>{pelicula.texto}</p>
//   </div>
