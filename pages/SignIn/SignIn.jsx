import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoLockClosed } from "react-icons/io5";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import fundo from "../SignIn/icons/fundoverde.png"


const api = "http://192.168.1.6:3000";



function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [visivel, setVisivel] = useState(false);

    async function enviar() {
        const email_usuario = email;
        const senha_usuario = senha;

        if (email_usuario === '' || senha_usuario === '') {
            alert('Preencha todos os campos');
            return;
        }

        if (senha_usuario.length < 8) {
            alert('A senha deve conter no mínimo 8 caracteres');
            return;
        }

        if (!email_usuario.includes('@') || !email_usuario.includes('.com')) {
            alert('Digite um email válido');
            return;
        }

        const resposta = await fetch(`${api}/loginUsuario`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email_usuario,
                senha_usuario,
            })
        });

        // try {
        //     const resposta = await axios.post(`${api}/loginUsuario`, { email_usuario, senha_usuario, });
        //     resposta.status == 200 ? navigate("/") : alert("Erro");

        //     console.log(email_usuario, senha_usuario)
        // }

        // catch (erro) {
        //     console.log(erro)
        // }

        const usuario = await resposta.json();

        if (resposta.status == 200) {
            localStorage.setItem("email", usuario.email_usuario);
            localStorage.setItem("id", usuario.id_usuario);
            console.log(usuario.nivel);
            if (usuario.nivel == '3') {
                return navigate("/Admin");
            }
        } else {
            alert("Usuario ou senha incorretos");
        }
    }


    return (
        <main className="flex items-center justify-between">
            <article className="p-10">
                <div className="flex justify-around text-[#d9d9d9]">
                    <p className="text-[#3c8670] border-b-4 border-[#3c8670] cursor-pointer font-anton">Login</p>
                    <Link to={"/Cadastro"} className="cursor-pointer font-gravitas">
                        Cadastrar-se
                    </Link>
                </div>
                <div className="flex flex-col justify-center items-start p-5 gap-5 ">
                    <div className="flex items-center rounded-2xl bg-white border-2 border-back-300 p-2 shadow-xl/30">
                        <BiSolidUserCircle color="#3c8670" size={20} />
                        <input className="bg-white outline-none ml-2 w-65 " value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email:" type="text" />
                    </div>
                    <div className="flex items-center rounded-2xl bg-white border-2 border-back-300 p-2 shadow-xl/30">
                        <IoLockClosed color="#3c8670" size={20} />
                        <input className="bg-white outline-none ml-2 w-60" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha:" type={visivel ? "password" : "text"} />
                        {visivel ? <BsEyeFill color="#3c8670" size={20} onClick={() => setVisivel(!visivel)} /> :
                            <BsEyeSlashFill color="#3c8670" size={20} onClick={() => setVisivel(!visivel)} />}
                    </div>
                    <button className="cursor-pointer bg-[#3c8670] rounded-4xl shadow-xl/30 text-[white] p-4" onClick={() => enviar()}>Entrar
                    </button>
                </div>
            </article>
            <div className="flex items-end justify-end w-full ">

            </div>
            <div
                className="h-screen bg-cover bg-center flex justify-center items-center w-700"
                style={{ backgroundImage: `url(${fundo})` }}>
                <img className="flex justify-center items-center w-70" src="pages/SignIn/icons/logo.png" alt="" />
            </div>
        </main>

    );
}

export default SignIn;