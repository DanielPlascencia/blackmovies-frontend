import React from "react";

const NotFound = () => {
  return (
    <div className=" flex-1 w-full px-2 flex flex-col justify-center items-center gap-3">
      <h1 className="movilS:text-5xl font-bold text-red-500">ERROR 404</h1>
      <p className="movilS:text-3xl ">Pagina No Encontrada</p>
      <div className="text-6xl text-red-400">
        <i className="fa-solid fa-face-sad-cry mx-1"></i>
        <i className="fa-solid fa-face-sad-tear mx-1"></i>
      </div>
    </div>
  );
};

export default NotFound;
