import { React, useState } from "react";
import useFuncionariosHook from "./useFuncionariosHook";
import { ExcluirFuncionario } from "../../services/crudServicos.service";

export function Funcionarios() {
  const { dados } = useFuncionariosHook();
  console.log(dados);

  return (
    <div id="principal" className="flex flex-wrap gap-6 p-6">
      {dados.map((element) => {
        return (
          <div
            key={element.id_usuario}
            className="w-60 h-fit shadow-2xl p-4 rounded-2xl border border-gray-100 flex flex-col gap-2"
          >
            <h1 className="font-bold">Id do funcionário:</h1>
            <h1>{element.id_usuario}</h1>
            <h1 className="font-bold">Email do funcionário:</h1>
            <h1>{element.email_usuario}</h1>
            <h1 className="font-bold">Nível:</h1>
            <p>{element.nivel == null ? 1 : ""}</p>
            <div className="flex justify-around mt-5 mb-5">
              <button
                onClick={() => {
                 ExcluirFuncionario(element.id_usuario)
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
  );
}
