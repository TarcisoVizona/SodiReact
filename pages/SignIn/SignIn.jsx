import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoLockClosed } from "react-icons/io5";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import fundo from "../SignIn/icons/fundoverde.png";
import { api } from "../../api/api-config.js";
import CampoDeTexto from "../../components/CaixaDeTexto/CaixaDeTexto.jsx";
import axios from "axios";

function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [visivel, setVisivel] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isSenhaValid, setIsSenhaValid] = useState(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setIsSenhaValid(senha.length >= 8);
    }, [senha]);

    async function enviar() {
        console.log("aki")
        if (!email || !senha) {
            alert("Preencha todos os campos");
            return;
        }

        if (!isEmailValid) {
            alert("Digite um email válido");
            return;
        }

        if (!isSenhaValid) {
            alert("A senha deve conter no mínimo 8 caracteres");
            return;
        }

        console.log({email, senha})
        try {
            const { data, status } = await api.post("/loginUsuario", {
                email_usuario: email,
                senha_usuario: senha,
            });

            console.log(status)

            if (status === 200) {
                localStorage.setItem("email", data.email_usuario);
                localStorage.setItem("id", data.id_usuario);

                data.nivel == "3"
                    ? navigate("/Admin")
                    : navigate("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)){
                if(error.status == 404)
                    return alert("E-mail não cadastrado")
            }
            else {
                alert("usuario ou senha incorreto")
            }
        }
    }

    return (
        <main className="flex min-h-screen bg-[#ffffff]">
            <article className="flex flex-col justify-center px-16 w-[40%]">

                <div className="flex gap-10 text-[#d9d9d9] mb-10">
                    <p className="text-[#3c8670] border-b-4 border-[#3c8670] pb-1 cursor-pointer font-bold">
                        Login
                    </p>

                    <Link
                        to={"/Cadastro"}
                        className="cursor-pointer"
                    >
                        Cadastrar-se
                    </Link>
                </div>

                <div className="flex flex-col gap-6 w-full ">

                    <CampoDeTexto
                        label="E-mail"
                        placeholder="Digite seu email"
                        texto={email}
                        setTexto={setEmail}
                        isValid={isEmailValid}
                        errorMessage="E-mail inválido"
                        className="border-black"
                    >
                        <BiSolidUserCircle
                            color="#3c8670"
                            size={22}
                        />
                    </CampoDeTexto>

                    <CampoDeTexto
                        label="Senha"
                        placeholder="Digite sua senha"
                        texto={senha}
                        setTexto={setSenha}
                        isValid={isSenhaValid}
                        errorMessage="Senha deve ter no mínimo 8 caracteres"
                        type={visivel ? "text" : "password"}
                    >
                        <div
                            className="cursor-pointer"
                            onClick={() => setVisivel(!visivel)}
                        >
                            {visivel ? (
                                <BsEyeFill
                                    color="#3c8670"
                                    size={20}
                                />
                            ) : (
                                <BsEyeSlashFill
                                    color="#3c8670"
                                    size={20}
                                />
                            )}
                        </div>
                    </CampoDeTexto>

                    <button
                        onClick={()=> enviar()}
                        className="rounded-full p-4 text-white font-semibold duration-300 bg-[#3c8670] hover:bg-[#2f6b59] cursor-pointer shadow-xl"
                    >
                        Entrar
                    </button>
                </div>
            </article>

            <div
                className="flex-1 bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${fundo})` }}
            >
                <img
                    className="w-72"
                    src="pages/SignIn/icons/logo.png"
                    alt="logo"
                />
            </div>
        </main>
    );
}

export default SignIn;