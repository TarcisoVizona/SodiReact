import { useEffect, useState } from "react";
import { TodosClientes } from "../../services/ClientesServico.service";
import { Excluir } from "../../services/crudServicos.service";

const useClientesHook = () => {
  const [dados, setDados] = useState([]);
  const [controle, setControle] = useState(false);

  useEffect(() => {
    TodosClientes().then((clientes) => {
      console.log(clientes);
      return setDados(clientes);
    });
  }, [controle]);

  async function handleDeleteUsers(id) {
    await Excluir(id);

    setControle(!controle);
  }

  return {
    dados,
    setControle,
    controle,
    handleDeleteUsers,
  };
};

export default useClientesHook;
