import { React, useEffect, useState } from "react";
import { TodasOrdens } from "../../services/ordemServico.service";
import useClientesHook from "./useClientesHook";
import { Excluir } from "../../services/crudServicos.service";
import axios from "axios";
import { api } from "../../api/api-config";

export function Clientes() {
  const { dados, setControle, controle, handleDeleteUsers } = useClientesHook();

  const [email, setEmail] = useState("");

  const [nome, setNome] = useState("");

  const [cpfcnpj, setCpfCnpj] = useState("");

  const [telefone, setTelefone] = useState("");

  const [endereco, setEndereco] = useState("");

  async function cadastrarCliente() {
    try {
      const response = await api.post("/cadastroCliente", {
        email_cliente: email,
        nome_cliente: nome,
        cpf_cnpj: cpfcnpj,
        telefone_cliente: telefone,
        endereco_cliente: endereco,
      });
      console.log(response.data);
      alert("Cliente cadastrado com sucesso!");
      setControle(!controle);
    } catch (error) {
      alert("Não foi possível cadastrar novo cliente!");
      console.log(error);
    }
  }

  useEffect(() => {}, [controle]);

  return (
    <div className="flex justify-between">
      <div>
        <div
          id="principal"
          className="flex flex-wrap justify-center gap-10 p-6"
        >
          {dados.map((element) => {
            return (
              <div
                key={element.id_cliente}
                className="w-60 h-fit shadow-2xl p-4 rounded-2xl border border-gray-100 flex flex-col gap-2"
              >
                <h1 className="font-bold">Id do cliente:</h1>
                <h1>{element.id_cliente}</h1>
                <h1 className="font-bold">Nome do cliente:</h1>
                <p>{element.nome_cliente}</p>
                <h1 className="font-bold">Email do cliente:</h1>
                <p>{element.email}</p>
                <h1 className="font-bold">Telefone do cliente:</h1>
                <p>{element.telefone_cliente}</p>
                <div className="flex justify-around mt-5 mb-5">
                  <button
                    onClick={() => {
                      handleDeleteUsers(element.id_cliente);
                    }}
                    className="cursor-pointer shadow-xl/10 border border-gray-100 rounded-2xl p-5"
                  >
                    ❌​
                  </button>
                  <button className="cursor-pointer shadow-xl/10 border border-gray-100 rounded-2xl p-5">
                    ✏️​
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex p-6">
          <div className="gap-10 flex flex-col justify-center items-center bg-adminGreen w-80 h-fit p-10 rounded-2xl">
            <h1 className="text-white text-2xl">Cadastro de clientes</h1>

            <div className="flex flex-col gap-6">
              <input
                type="text"
                className="bg-white 65 p-3 rounded-[10px]"
                placeholder="Email do cliente..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="bg-white 65 p-3 rounded-[10px]"
                placeholder="Nome do cliente..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="text"
                className="bg-white 65 p-3 rounded-[10px]"
                placeholder="Cpf ou Cnpj do cliente..."
                value={cpfcnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
              />
              <input
                type="text"
                className="bg-white 65 p-3 rounded-[10px]"
                placeholder="Telefone do cliente..."
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <input
                type="text"
                className="bg-white 65 p-3 rounded-[10px]"
                placeholder="Endereço do cliente..."
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <button
                onClick={() => {
                  cadastrarCliente();
                }}
                className="w-60 cursor-pointer bg-emerald-800 p-3 rounded-[10px] hover:bg-emerald-900 text-white"
              >
                Adicionar máquina
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
