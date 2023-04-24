import React from "react";

const Button = ({ texto, tipo }) => {
  return (
    <button
      className={`movilS:px-3 movilS:py-1 movilS:text-md tablet:text-lg uppercase border rounded-full ${
        tipo == "primario"
          ? "text-white bg-black hover:text-black hover:bg-white border-white"
          : "text-black bg-white hover:text-white hover:bg-black border-black"
      }   
      
      `}
    >
      {texto}
    </button>
  );
};

export default Button;
