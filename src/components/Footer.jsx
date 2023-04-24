import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 h-24 w-full flex justify-around items-center px-5 gap-2 movilS:text-sm tablet:text-xl">
      <p className="">
        CopyRight 2023
        <span className="block"> Todos los derechos reservados</span>
      </p>

      <div className="movilS:text-sm tablet:text-xl">
        <p className="font-bold">Redes sociales: </p>

        <div className="text-black dark:text-white movilS:text-xl tablet:text-3xl flex justify-between items-center">
          <a
            href="https://www.facebook.com/caxlsh/"
            className="hover:text-black"
          >
            <i className="fa-brands fa-facebook" />
          </a>
          <a href="https://twitter.com/Javat_Man" className="hover:text-black">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://github.com/CJavat" className="hover:text-black">
            <i className="fa-brands fa-github" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
