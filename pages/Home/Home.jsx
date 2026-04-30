import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
const api = "http://192.168.1.6:3000";

function Home() {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [busca, setBusca] = useState("");
  const [ordens, setOrdens] = useState([]);

  const [form, setForm] = useState({
    idMaquina: "",
    status: "",
    ano: "",
    descricao: "",
    marca: "",
    mecanico: "",
    modelo: "",
  });

  function mudarInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🔹 GET - buscar ordens do usuário
  async function buscarOrdens() {
    const id_usuario = localStorage.getItem("id");

    const resposta = await fetch(`${api}/ordens/${id_usuario}`);
    const dados = await resposta.json();

    setOrdens(dados);
  }

  useEffect(() => {
    buscarOrdens();
  }, []);

  async function salvar() {
    const id_usuario = localStorage.getItem("id");

    // validação simples
    for (let campo in form) {
      if (form[campo] == "") {
        alert("Preencha todos os campos");
        return;
      }
    }

    const resposta = await fetch(`${api}/criarOrdem`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...form,
        id_usuario,
      }),
    });

    if (resposta.status == 200) {
      alert("Ordem criada!");
      setMostrarForm(false);

      setForm({
        idMaquina: "",
        status: "",
        ano: "",
        descricao: "",
        marca: "",
        mecanico: "",
        modelo: "",
      });

      buscarOrdens();
    } else {
      alert("Erro ao criar ordem");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#24ac85] p-5 flex justify-center  items-center">
       <div className="flex-2 flex justify-end pr-25">
         <input
          type="text"
          placeholder="Buscar ordem..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="p-3 w-80 rounded-full outiline-none bg-white "
        />
       </div>
        <div className="flex-1 flex justify-end">
          <MdOutlineLogout size="40" color="white" />
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
              <input
                name="idMaquina"
                placeholder="Id da Máquina"
                value={form.idMaquina}
                onChange={mudarInput}
                className="border p-2 rounded-xl"
              />
              <input
                name="status"
                placeholder="Status"
                value={form.status}
                onChange={mudarInput}
                className="border p-2 rounded-xl"
              />
              <input
                name="ano"
                placeholder="Ano"
                value={form.ano}
                onChange={mudarInput}
                className="border p-2 rounded-xl"
              />
              <input
                name="descricao"
                placeholder="Descrição"
                value={form.descricao}
                onChange={mudarInput}
                className="border p-2 rounded-xl"
              />
              <input
                name="marca"
                placeholder="Marca"
                value={form.marca}
                onChange={mudarInput}
                className="border p-2 rounded-xl"
              />
              <input
                name="mecanico"
                placeholder="Mecânico"
                value={form.mecanico}
                onChange={mudarInput}
                className="border p-2 rounded-xl"
              />
              <input
                name="modelo"
                placeholder="Modelo"
                value={form.modelo}
                onChange={mudarInput}
                className="border p-2 rounded-xl"
              />
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

        <div className="w-80 flex flex-col gap-3">
          {ordens
            .filter((ordem) =>
              ordem.descricao.toLowerCase().includes(busca.toLowerCase()),
            )
            .map((ordem) => (
              <div key={ordem.id} className="bg-white p-3 rounded-xl shadow">
                <p>
                  <b>Máquina:</b> {ordem.idMaquina}
                </p>
                <p>
                  <b>Status:</b> {ordem.status}
                </p>
                <p>
                  <b>Descrição:</b> {ordem.descricao}
                </p>
              </div>
            ))}
        </div>
      </div>

      <footer className="bg-[#24ac85] h-20 mt-auto"></footer>
    </main>
  );
}

export default Home;
