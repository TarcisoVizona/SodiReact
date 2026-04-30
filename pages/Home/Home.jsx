import { useState } from "react";

function Home() {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [busca, setBusca] = useState("");

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
    const nome = e.target.name;
    const valor = e.target.value;
    const novoForm = { ...form };
    novoForm[nome] = valor;

    setForm(novoForm);
  }


  function salvar() {
    console.log(form);
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
  }

  function renderBotao() {
    return (
      !mostrarForm && (
        <button
          onClick={() => setMostrarForm(true)}
          className="bg-[#24ac85] text-white px-6 py-2 rounded-full"
        >
          Criar nova ordem
        </button>
      )
    );
  }

  function renderFormulario() {
    return (
      mostrarForm && (
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
              placeholder="Ano da Máquina"
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
              placeholder="Mecânico responsável"
              value={form.mecanico}
              onChange={mudarInput}
              className="border p-2 rounded-xl"
            />

            <input
              name="modelo"
              placeholder="Modelo da Máquina"
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
      )
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      
      <header className="bg-[#24ac85] p-5 flex justify-center">
        <input
          type="text"
          placeholder="Buscar ordem..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="p-3 w-80 rounded-full"
        />
      </header>

      
      <div className="flex flex-col items-center mt-10 gap-6">
        {renderBotao()}
        {renderFormulario()}
      </div>

      
      <footer className="bg-[#24ac85] h-20 mt-auto"></footer>
    </main>
  );
}

export default Home;