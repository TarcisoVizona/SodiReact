import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const api = "http://192.168.1.6:3000";

function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

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
        <main className="flex  items-center justify-center">
            <div className="flex flex-col justify-center items-center">
                <div className="flex gap-10 m-1">
                    <p className="cursor-pointer">Login</p>
                    <p className="cursor-pointer">Cadastrar-se</p>
                </div>

                <div className="flex flex-col gap-4">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="E-mail"
                    />

                    <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Senha"
                    />
                </div>

                <div>
                    <button className="cursor-pointer" onClick={()=>enviar()}>Entrar</button>
                </div>
            </div>
        </main>
    );
}

export default SignIn;