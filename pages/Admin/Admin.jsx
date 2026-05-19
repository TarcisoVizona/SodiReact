import React, { createElement, useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import sodiLogo from "./Icons/sodi2.png";
import casa from "./Icons/casa.png";
import grafico from "./Icons/grafico.png";
import maquinario from "./Icons/maquinario.png";
import perfil from "./Icons/perfil.png";
import funciario from "./Icons/funcionario.svg";
import planilha from "./Icons/planilha.png";
import sair from "./Icons/sair.png";
import blackperfil from "./Icons/blackperfil.svg";
import logout from "./Icons/logout.svg";
import axios from "axios";
import { api } from "../../api/api-config";
import { Maquinas } from "../Maquinas/Maquinas";
import { Funcionarios } from "../Funcionarios/Funcionarios";
import { Clientes } from "../Clientes/Clientes";

function Admin() {
  function logOut() {
    localStorage.removeItem("email");
    localStorage.removeItem("id");
  }

  const [dados, setDados] = useState([]);

  const [page, setPage] = useState("adm");

  const [modelo, setModelo] = useState("");

  const [marca, setMarca] = useState("");

  const [anoMaq, setAnoMaq] = useState("");

  const [idCliente, setIdCliente] = useState("");

  const [img, setImg] = useState(null);

  async function ordensAbertas() {
    try {
      const { data, status } = await api.get("/statusAberta");
      console.log(data);
      setDados(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function ordensManutencao() {
    try {
      const { data, status } = await api.get("/statusManutencao");
      console.log(data);
      setDados(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function ordensConcluidas() {
    try {
      const { data, status } = await api.get("/statusConcluida");
      console.log(data);
      setDados(data);
    } catch (error) {
      console.log(error);
    }
  }

  const selecionarImagem = (event) => {
    setImg(event.target.files[0]);
  };

  async function CadastrarMaquinas() {
    try {
      const formData = new FormData();

      // const { modelo_maquina, marca_maquina, ano_maquina } = req.body;

      formData.append("modelo_maquina", modelo);
      formData.append("marca_maquina", marca);
      formData.append("ano_maquina", anoMaq);
      formData.append("id_cliente", idCliente);
      formData.append("imagem", img);

      console.log(modelo, marca, anoMaq, idCliente, img);

      const { status } = await api.post("/cadastrarMaquina", formData);
      if (status == 201) {
        alert("Cadastrado com sucesso");
      } else {
        alert("Erro ao cadastrar");
      }

      return;
    } catch (error) {
      alert(`Erro ao cadastrar máquina: ${error}`);
      console.log(modelo, marca, anoMaq, idCliente);
    }
  }

  useEffect(() => {
    ordensAbertas();
  }, []);

  return (
    <div className="min-h-screen flex">
      <aside className="flex flex-col items-baseline pl-11 min-h-full w-70 bg-adminGreen">
        <div className="flex flex-col h-screen justify-around items-baseline-last">
          <div
            onClick={() => {
              setPage("adm");
            }}
            className="flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95"
          >
            <img src={casa} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Administração</p>
          </div>
          <div
            onClick={() => {
              setPage("maquinas");
            }}
            className="flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95"
          >
            <img src={maquinario} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Máquinas</p>
          </div>
          <div
            onClick={() => {
              setPage("funcionarios");
            }}
            className="flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95"
          >
            <img src={funciario} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Funcionários</p>
          </div>
          <div
            onClick={() => {
              setPage("Clientes");
            }}
            className="flex justify-center items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-95"
          >
            <img src={perfil} alt="" className="w-10 h-10" />
            <p className="text-white text-[20px]">Clientes</p>
          </div>
        </div>
      </aside>
      <div className="flex-1">
        <header className="hidden md:flex h-30 p-6 shadow-2xl justify-between items-center ">
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
              <img
                onClick={logOut()}
                src={logout}
                alt=""
                className="cursor-pointer w-12 h-12"
              />
            </Link>
          </div>
        </header>
        {page == "adm" ? (
          <div className="flex justify-center items-start">
            <div className="flex-1 flex-col p-6 justify-center items-start">
              <div className="flex gap-6">
                <button
                  onClick={() => ordensAbertas()}
                  className="cursor-pointer rounded-2xl w-60 h-30 bg-orange-400 border-0 text-[25px] text-white transition-transform duration-300 hover:scale-95"
                >
                  Abertas
                </button>
                <button
                  onClick={() => ordensManutencao()}
                  className="cursor-pointer rounded-2xl w-60 h-30 bg-blue-400 text-[25px] text-white transition-transform duration-300 hover:scale-95"
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
                  return (
                    <div
                      key={element.id_ordem}
                      className="w-60 h-fit shadow-2xl p-4 rounded-2xl border border-gray-100 flex flex-col gap-2"
                    >
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
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-13 p-6">
              <div className="gap-10 flex flex-col justify-center items-center bg-adminGreen w-90 h-fit p-10 rounded-2xl">
                <h1 className="text-white text-2xl">Cadastro de máquinas</h1>
                <div className="flex flex-col gap-5">
                  <input
                    type="text"
                    className="bg-white w-80 p-3 rounded-[10px]"
                    placeholder="Modelo da máquina..."
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                  />
                  <input
                    type="text"
                    className="bg-white w-80 p-3 rounded-[10px]"
                    placeholder="Marca da máquina..."
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                  />
                  <input
                    type="text"
                    className="bg-white w-80 p-3 rounded-[10px]"
                    placeholder="Ano da máquina..."
                    value={anoMaq}
                    onChange={(e) => setAnoMaq(e.target.value)}
                  />
                  <input
                    type="text"
                    className="bg-white w-80 p-3 rounded-[10px]"
                    placeholder="Id do cliente..."
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                  />
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    className="bg-white w-80 p-3 rounded-[10px]"
                    onChange={selecionarImagem}
                    required
                  />
                  <button
                    onClick={() => {
                      CadastrarMaquinas();
                    }}
                    className="w-60 cursor-pointer bg-emerald-800 p-3 rounded-[10px] hover:bg-emerald-900 text-white"
                  >
                    Adicionar máquina
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : page == "maquinas" ? (
          <Maquinas />
        ) : page == "funcionarios" ? (
          <Funcionarios />
        ) : (
          <Clientes />
        )}
      </div>
    </div>
  );
}

export default Admin;
