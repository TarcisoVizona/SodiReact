import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import perfilIcon from './Icons/perfil.png';
import cadeadoIcon from './Icons/cadeado.png';
import sodiLogo from './Icons/sodi.png';
import fundoVerde from './Icons/fundoverde.png';

function Cadastrar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const navigate = useNavigate();
  const api = "http://192.168.1.6:3000";

  async function enviar() {
    if (email === '' || senha === '' || confirmarSenha === '') {
      alert('Preencha todos os campos!');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }
    if (senha.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres');
      return;
    }
    if (!email.includes('@') || !email.includes('.com')) {
      alert('Digite um email válido');
      return;
    }

    const resposta = await fetch(`${api}/cadastroUser`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email_usuario: email,
        senha_usuario: senha,
      })
    });

    if (resposta.status === 200) {
      alert("Cadastro realizado com sucesso!");
      navigate("/SignIn");
    } else {
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#f8f9fa] flex overflow-hidden font-sans">
      
   
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 z-10">
        <div className="w-full max-w-md">
          
          
          <div className="flex gap-12 mb-12 ml-4">
            <button 
              onClick={() => navigate("/SignIn")}
              className="text-gray-400 font-bold text-xl pb-2 border-b-4 border-transparent transition-all"
            >
              Login
            </button>
            <button className="text-[#40826d] font-bold text-xl pb-2 border-b-4 border-[#40826d]">
              Sign up
            </button>
          </div>

         
          <div className="flex flex-col gap-6 w-full">
            
            <div className="relative group">
              <img src={perfilIcon} alt="Perfil" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 object-contain" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Insira seu email"
                className="w-full py-3 px-12 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#40826d] transition-all"
              />
            </div>

            
            <div className="relative group">
              <img src={cadeadoIcon} alt="Senha" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 object-contain" />
              <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                placeholder="Insira sua senha"
                className="w-full py-3 px-12 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#40826d] transition-all"
              />
            </div>

            <div className="relative group">
              <img src={cadeadoIcon} alt="Confirmar Senha" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 object-contain" />
              <input
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                type="password"
                placeholder="Confirme sua senha"
                className="w-full py-3 px-12 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#40826d] transition-all"
              />
            </div>

           
            <div className="flex justify-end mt-4">
              <button
                onClick={enviar}
                className="bg-[#4a8b76] hover:bg-[#386b5a] text-white font-bold py-2 px-10 rounded-full shadow-md transition-colors text-lg"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
      
        <img 
            src={fundoVerde} 
            alt="Fundo" 
            className="absolute right-0 h-full w-full object-cover object-left" 
        />
        
        
        <div className="relative z-20 flex flex-col items-center">
          <img src={sodiLogo} alt="Logo SODI" className="w-64 h-auto drop-shadow-2xl" />
        </div>
      </div>
    </main>
  );
}

export default Cadastrar;