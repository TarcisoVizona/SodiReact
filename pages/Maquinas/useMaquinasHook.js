import { useEffect, useState } from "react";
import { TodasMaquinas } from "../../services/maquinasServico.service"

const useMaquinasHook = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    TodasMaquinas().then((maquinas) => setDados(maquinas));
  }, []);

  return {
    dados,
  };
};

export default useMaquinasHook;
