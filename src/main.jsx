import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "../pages/Home/Home.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import Error from "../pages/Error/Error.jsx";
import Cadastro from "../pages/Cadastro/Cadastro.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Rotas das páginas
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/*" element={<Error />}></Route>
        <Route path="/Cadastro" element={<Cadastro />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
