import { useEffect, useState } from "react";
import { TodosFuncionarios } from "../../services/funcionariosServico.service";
import { ExcluirFuncionario } from "../../services/crudServicos.service";

const useFuncionariosHook = () => {
  const [dados, setDados] = useState([]);
  const [controle, setControle] = useState(false);

  useEffect(() => {
    TodosFuncionarios().then((funcionarios) => {
      console.log(funcionarios);
      return setDados(funcionarios);
    });
  }, [controle]);

  async function handleDeleteEmployee(id) {
    await ExcluirFuncionario(id);
    setControle(!controle);
  }

  return {
    dados,
    setControle,
    controle,
    handleDeleteEmployee,
  };
};

export default useFuncionariosHook;
