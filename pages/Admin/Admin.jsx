import React from "react";
import { Link } from "react-router-dom";
import sodiLogo from "./Icons/sodi2.png";
import casa from "./Icons/casa.png";
import grafico from "./Icons/grafico.png";
import maquinario from "./Icons/maquinario.png";
import perfil from "./Icons/perfil.png";
import planilha from "./Icons/planilha.png";
import sair from "./Icons/sair.png";
import blackperfil from "./Icons/blackperfil.svg";
import logout from "./Icons/logout.svg";

function Admin() {
  return (
    <div className="h-screen flex">
      <aside className="h-screen w-70 bg-adminGreen pl-6">
        <div className="flex flex-col items-baseline justify-around h-screen">
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
        <div className="flex gap-13 p-6 justify-center items-xcenter">
          <button className="cursor-pointer rounded-2xl w-60 h-30 bg-orange-400 border-0 text-[25px] text-white transition-transform duration-300 hover:scale-95">
            Ordens abertas
          </button>
          <button className="cursor-pointer  rounded-2xl w-60 h-30 bg-blue-400 text-[25px] text-white transition-transform duration-300 hover:scale-95">
            Em manutenção
          </button>
          <button className="cursor-pointer rounded-2xl w-60 h-30 bg-green-400 text-[25px] text-white transition-transform duration-300 hover:scale-95">
            Concluídas
          </button>
          <div className="gap-10 flex flex-col justify-center items-center bg-adminGreen w-80 h-fit p-10 rounded-2xl">
            <h1 className="text-white text-2xl">Cadastro de máquinas</h1>
            <button className="w-60 cursor-pointer bg-white p-3 rounded-[10px]">
              Adicionar máquinas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
