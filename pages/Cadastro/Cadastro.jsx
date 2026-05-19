import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BiSolidUserCircle } from "react-icons/bi";
import { IoLockClosed } from "react-icons/io5";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import fundoVerde from "../Cadastro/Icons/fundoverde.png";
import { api } from "../../api/api-config.js";
import CampoDeTexto from "../../components/CaixaDeTexto/CaixaDeTexto.jsx";
import axios from "axios";

function Cadastrar() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [visivel, setVisivel] = useState(false);
    const [visivelConfirm, setVisivelConfirm] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isSenhaValid, setIsSenhaValid] = useState(true);
    const [isConfirmSenhaValid, setIsConfirmSenhaValid] = useState(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    useEffect(() => {
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setIsSenhaValid(senhaRegex.test(senha));
    }, [senha]);

    useEffect(() => {
        setIsConfirmSenhaValid(senha === confirmarSenha);
    }, [confirmarSenha]);

    async function enviar() {
        if (!email || !senha || !confirmarSenha) {
            alert("Preencha todos os campos");
            return;
        }

        if (!isEmailValid) {
            alert("Digite um email válido");
            return;
        }

        if (!isSenhaValid) {
            alert("A senha deve conter no mínimo 8 caracteres, Letras maiúscula e minúscula, além de um símbolo");
            return;
        }

        if (!isConfirmSenhaValid) {
            alert("As senhas não coincidem");
            return;
        }

        try {
            const { status } = await api.post("/cadastroUser", {
                email_usuario: email,
                senha_usuario: senha,
            });

            if (status === 200) {
                alert("Cadastro realizado com sucesso!");
                navigate("/SignIn");
            }
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                alert("Erro ao cadastrar usuário");
            } else {
                alert("Erro inesperado");
            }
        }
    }

    return (
        <main className="flex min-h-screen bg-[#ffffff]">
            <article className="flex flex-col justify-center px-16 w-[40%]">

                <div className="flex gap-10 text-[#d9d9d9] mb-10">
                    <Link
                        to={"/SignIn"}
                        className="cursor-pointer"
                    >
                        Login
                    </Link>

                    <p className="text-[#3c8670] border-b-4 border-[#3c8670] pb-1 cursor-pointer font-bold">
                        Cadastrar-se
                    </p>
                </div>

                <div className="flex flex-col gap-6 w-full">

                    <CampoDeTexto
                        label="E-mail"
                        placeholder="Digite seu email"
                        texto={email}
                        setTexto={setEmail}
                        isValid={isEmailValid}
                        errorMessage="E-mail inválido"
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

                    <CampoDeTexto
                        label="Confirmar senha"
                        placeholder="Confirme sua senha"
                        texto={confirmarSenha}
                        setTexto={setConfirmarSenha}
                        isValid={isConfirmSenhaValid}
                        errorMessage="As senhas não coincidem"
                        type={visivelConfirm ? "text" : "password"}
                    >
                        <div
                            className="cursor-pointer"
                            onClick={() => setVisivelConfirm(!visivelConfirm)}
                        >
                            {visivelConfirm ? (
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
                        onClick={() => enviar()}
                        className="rounded-full p-4 text-white font-semibold duration-300 bg-[#3c8670] hover:bg-[#2f6b59] cursor-pointer shadow-xl"
                    >
                        Cadastrar
                    </button>
                </div>
            </article>

            <div
                className="flex-1 bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${fundoVerde})` }}
            >
                <img
                    className="w-45"
                    src="pages/Cadastro/Icons/sodi.png"
                    alt="logo"
                />
            </div>
        </main>
    );
}

export default Cadastrar;