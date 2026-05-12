import { React, useState } from "react";
import { TodasOrdens } from "../../services/ordemServico.service";
import useMaquinasHook from "./useMaquinasHook";

export function Maquinas() {
  const { dados } = useMaquinasHook();

  return (
    <div id="principal" className="flex flex-wrap gap-6 p-6">
      {dados.map((element) => {
        const byteArray = new Uint8Array(element.data.data);
        const blob = new Blob([byteArray], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        const img = document.createElement("img");
        img.src = url;
        img.style.width = "50px";
        img.style.height = "50px";
        return (
          <div
            key={element.id_maquinas}
            className="w-60 h-fit shadow-2xl p-4 rounded-2xl border border-gray-100 flex flex-col gap-2"
          >
            <h1 className="font-bold">Id da máquina:</h1>
            <h1>{element.id_maquinas}</h1>
            <h1 className="font-bold">Modelo da máquina:</h1>
            <h1>{element.modelo_maquina}</h1>
            <h1 className="font-bold">Marca da máquina:</h1>
            <p>{element.marca_maquina}</p>
            <h1 className="font-bold">Ano da máquina:</h1>
            <p>{element.ano_maquina}</p>
            <img src={url} alt="imagem máquina" />
          </div>
        );
      })}
    </div>
  );
}
