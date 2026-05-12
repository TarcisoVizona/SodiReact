import { useEffect, useState } from "react";
import { TodosClientes } from "../../services/ClientesServico.service";

const useClientesHook = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    TodosClientes().then((clientes) => setDados(clientes));
  }, []);

  return {
    dados,
  };
};

export default useClientesHook;
