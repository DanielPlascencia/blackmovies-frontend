import { useContext } from "react";
import PeliculasContext from "../context/PeliculasProvider";

const usePeliculas = () => {
  return useContext(PeliculasContext);
};

export default usePeliculas;
