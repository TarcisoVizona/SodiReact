import React, { createElement, useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import sodiLogo from "./Icons/sodi2.png";
import casa from "./Icons/casa.png";
import grafico from "./Icons/grafico.png";
import maquinario from "./Icons/maquinario.png";
import perfil from "./Icons/perfil.png";
import planilha from "./Icons/planilha.png";
import sair from "./Icons/sair.png";
import blackperfil from "./Icons/blackperfil.svg";
import logout from "./Icons/logout.svg";
import axios from "axios";
import { api } from "../../api/axios-config";

function Admin() {
  const [dados, setDados] = useState([]);
  async function ordensAbertas() {
    try {
      const { data, status } = await api.get("/statusAberta");
      console.log(data);
      setDados(data);
    } catch (error) {
      console.log(error);
    }
  }

  const ordensManutencao = async () => {
    const resposta = await fetch(`${api}/statusManutencao`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await resposta.json();
    setDados(data);
  };

  const ordensConcluidas = async () => {
    const resposta = await fetch(`${api}/statusConcluida`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await resposta.json();
    setDados(data);
  };

  useEffect(() => {
    ordensAbertas();
  }, []);

  return (
    <div className="min-h-screen flex">
      <aside className="flex flex-col items-baseline pl-6 justify-around min-h-full w-70 bg-adminGreen">
        <div className="flex flex-col h-screen justify-around items-baseline-last">
          <div className="flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95">
            <img src={casa} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Administração</p>
          </div>
          <div className="flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95">
            <img src={planilha} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Ordens de Serviço</p>
          </div>
          <div className="flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95">
            <img src={maquinario} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Máquinas</p>
          </div>
          <div className="flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95">
            <img src={perfil} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Funcionários</p>
          </div>
          <div className=" flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95">
            <img src={grafico} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Histórico</p>
          </div>
        </div>
      </aside>
      <div className="flex-1">
        <header className="h-30 flex p-6 shadow-2xl justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              <span className="text-HeahderGreen">SODI</span>
            </h1>
          </div>
          <div className="flex gap-5">
            <img
              src={blackperfil}
              alt=""
              className="cursor-pointer w-12 h-12"
            />
            <Link to="/SignIn">
              <img src={logout} alt="" className="cursor-pointer w-12 h-12" />
            </Link>
          </div>
        </header>
        <div className="flex justify-center items-start ">
          <div className="flex-1 flex-col gap-13 p-6 justify-center items-start">
            <div className="flex gap-6">
              <button
                onClick={() => ordensAbertas()}
                className="cursor-pointer rounded-2xl w-60 h-30 bg-orange-400 border-0 text-[25px] text-white transition-transform duration-300 hover:scale-95"
              >
                Abertas
              </button>
              <button
                onClick={() => ordensManutencao()}
                className="cursor-pointer  rounded-2xl w-60 h-30 bg-blue-400 text-[25px] text-white transition-transform duration-300 hover:scale-95"
              >
                Em manutenção
              </button>
              <button
                onClick={() => ordensConcluidas()}
                className="cursor-pointer rounded-2xl w-60 h-30 bg-green-400 text-[25px] text-white transition-transform duration-300 hover:scale-95"
              >
                Concluídas
              </button>
            </div>
            <div id="principal" className="flex flex-wrap gap-6 mt-6">
              {dados.map((element) => {
                <div className="w-60 h-fit shadow-2xl p-4 rounded-2xl border border-gray-100 flex flex-col gap-2">
                  <h1 className="font-bold">Mecânico responsável:</h1>
                  <h1>{element.nome_mecanico}</h1>
                  <h1 className="font-bold">Data de abertura:</h1>
                  <p>{element.data_abertura.slice(0, 10)}</p>
                  <h1 className="font-bold">Descrição:</h1>
                  <p>{element.descricao_problema}</p>
                  <h1 className="font-bold">Status:</h1>
                  <p>{element.status}</p>
                  <h1 className="font-bold">Id da máquina:</h1>
                  <p>{element.id_maquinas}</p>
                </div>;
              })}
            </div>
          </div>
          <div className="flex gap-13 p-6">
            <div className="gap-10 flex flex-col justify-center items-center bg-adminGreen w-80 h-fit p-10 rounded-2xl">
              <h1 className="text-white text-2xl">Cadastro de máquinas</h1>
              <button className="w-60 cursor-pointer bg-white p-3 rounded-[10px]">
                Adicionar máquinas
              </button>
              <div>
                <input type="text" />
                <input type="text" />
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
