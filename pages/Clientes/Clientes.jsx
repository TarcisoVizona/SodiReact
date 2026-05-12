import { React, useState } from "react";
import { TodasOrdens } from "../../services/ordemServico.service";
import useClientesHook from "./useClientesHook";
import { Excluir } from "../../services/crudServicos.service";

export function Clientes() {
  const { dados } = useClientesHook();
  
  return (
    <div id="principal" className="flex flex-wrap gap-6 p-6">
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
              <button onClick={() => {Excluir(element.id_cliente)}} className="cursor-pointer shadow-xl/10 border border-gray-100 rounded-2xl p-5">
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
  );
}
