import { useEffect, useState } from "react";
import { TodosFuncionarios } from "../../services/funcionariosServico.service";

const useFuncionariosHook = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    TodosFuncionarios().then((funcionarios) => setDados(funcionarios));
  }, []);
  console.log(dados);
  return {
    dados,
  };
};

export default useFuncionariosHook;
