import { useState, useEffect, use } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { api } from "../../api/api-config";
import { data } from "react-router-dom";


//CERTO DO TIO RO
const listaBack = axios
  .get("http://192.168.1.9:3000/endmaquinas")
  .then((resp) => resp.data);

function Home() {
  const lista = use(listaBack);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [busca, setBusca] = useState("");
  const [ordens, setOrdens] = useState([]);
  const [clicouSalvar, setClicouSalvar] = useState(false);

  const [form, setForm] = useState({
    idMaquina: "",
    status: "",
    ano: "",
    descricao: "",
    marca: "",
    mecanico: "",
    imagem: "",
  });

  const [isStatusValid, setIsStatusValid] = useState(true);
  const [isAnoValid, setIsAnoValid] = useState(true);
  const [isDescricaoValid, setIsDescricaoValid] = useState(true);
  const [isMarcaValid, setIsMarcaValid] = useState(true);
  const [isMecanicoValid, setIsMecanicoValid] = useState(true);

  useEffect(() => {
    if (form.status.length < 5) {
      setIsStatusValid(false);
    } else {
      setIsStatusValid(true);
    }

    if (form.ano.length < 4) {
      setIsAnoValid(false);
    } else {
      setIsAnoValid(true);
    }

    if (form.descricao.length < 5) {
      setIsDescricaoValid(false);
    } else {
      setIsDescricaoValid(true);
    }

    if (form.marca.length < 5) {
      setIsMarcaValid(false);
    } else {
      setIsMarcaValid(true);
    }

    if (form.mecanico.length < 5) {
      setIsMecanicoValid(false);
    } else {
      setIsMecanicoValid(true);
    }
  }, [form]);

  function mudarInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function enviarImagem(e) {
    const arquivo = e.target.files[0];

    if (!arquivo) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(arquivo);

    reader.onload = () => {
      setForm({
        ...form,
        imagem: reader.result,
      });
    };
  }

  async function buscarOrdens() {
    try {
      const resposta = await api.get("/OS/");
      setOrdens(resposta.data);
    } catch (erro) {
      alert("Erro ao buscar ordens");
    }
  }

  useEffect(() => {
    buscarOrdens();
  }, []);

  async function salvar() {
    setClicouSalvar(true);

    if (
      isStatusValid == false ||
      isAnoValid == false ||
      isDescricaoValid == false ||
      isMarcaValid == false ||
      isMecanicoValid == false
    ) {
      return;
    }

    try {
      console.log(form);

      const formData = new FormData();

      formData.append("nome_mecanico", form.mecanico);
      formData.append("data_abertura", new Date());
      formData.append("descricao_problema", form.descricao);
      formData.append("id_maquinas", form.idMaquina);
      formData.append("status", form.status);
      formData.append("imagem", form.imagem);

      const resposta = await api.post("/cadastrarOS", formData);

      if (resposta.status == 201) {
        alert("Ordem criada!");

        setMostrarForm(false);

        setForm({
          idMaquina: "",
          status: "",
          ano: "",
          descricao: "",
          marca: "",
          mecanico: "",
          imagem: "",
        });

        setClicouSalvar(false);
      }
    } catch (erro) {
      console.log(erro);
      return alert("Erro ao salvar");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#24ac85] p-5 flex justify-center items-center">
        <div className="flex-2 flex justify-end pr-25">
          <input
            type="text"
            placeholder="Buscar ordem..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="p-3 w-80 rounded-full outline-none bg-white"
          />
        </div>

        <div className="flex-1 flex justify-end">
          <CgProfile size="40" color="white" />
        </div>
      </header>

      <div className="flex flex-col items-center mt-10 gap-6">
        {!mostrarForm && (
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-[#24ac85] text-white px-6 py-2 rounded-full"
          >
            Criar nova ordem
          </button>
        )}

        {mostrarForm && (
          <div className="bg-white p-6 rounded-2xl w-80 shadow">
            <div className="flex flex-col gap-3">
              <select
                name="idMaquina"
                className="border p-2 rounded-xl"
                value={form.idMaquina}
                onChange={mudarInput}
              >
                <option value="">Selecione uma máquina</option>

                {lista.map((user) => (
                  <option key={user.id_maquinas} value={user.id_maquinas}>
                    {user.id_maquinas}
                  </option>
                ))}
              </select>

              <div>
                <input
                  name="status"
                  placeholder="Status"
                  value={form.status}
                  onChange={mudarInput}
                  className="border p-2 rounded-xl w-full"
                />

                {clicouSalvar && !isStatusValid && (
                  <p className="text-red-500 text-sm">Status inválido</p>
                )}
              </div>

              <div>
                <input
                  name="ano"
                  placeholder="Ano"
                  value={form.ano}
                  onChange={mudarInput}
                  className="border p-2 rounded-xl w-full"
                />

                {clicouSalvar && !isAnoValid && (
                  <p className="text-red-500 text-sm">Ano inválido</p>
                )}
              </div>

              <div>
                <input
                  name="descricao"
                  placeholder="Descrição"
                  value={form.descricao}
                  onChange={mudarInput}
                  className="border p-2 rounded-xl w-full"
                />

                {clicouSalvar && !isDescricaoValid && (
                  <p className="text-red-500 text-sm">Descrição inválida</p>
                )}
              </div>

              <div>
                <input
                  name="marca"
                  placeholder="Marca"
                  value={form.marca}
                  onChange={mudarInput}
                  className="border p-2 rounded-xl w-full"
                />

                {clicouSalvar && !isMarcaValid && (
                  <p className="text-red-500 text-sm">Marca inválida</p>
                )}
              </div>

              <div>
                <input
                  name="mecanico"
                  placeholder="Mecânico"
                  value={form.mecanico}
                  onChange={mudarInput}
                  className="border p-2 rounded-xl w-full"
                />

                {clicouSalvar && !isMecanicoValid && (
                  <p className="text-red-500 text-sm">Mecânico inválido</p>
                )}
              </div>

              <div>
                <label>Adicionar imagem</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={enviarImagem}
                  className="border p-2 rounded-xl w-full"
                />

                {form.imagem && (
                  <img
                    src={form.imagem}
                    alt="Imagem"
                    className="w-40 mt-3 rounded-xl"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <button
                onClick={salvar}
                className="bg-[#24ac85] text-white px-4 py-2 rounded-full"
              >
                Salvar
              </button>

              <button
                onClick={() => setMostrarForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#24ac85] h-20 mt-auto"></footer>
    </main>
  );
}

export default Home;