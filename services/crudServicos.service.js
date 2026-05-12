import { React, useState } from "react";
import axios from "axios";
import { api } from "../api/api-config";

export async function Excluir(id) {
  try {
    const { data, status } = await api.delete(`/deletar_cliente/${id}`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Erro ao deletar funcionários!");
      return;
    }
  }
}

export async function ExcluirFuncionario(id_usuario) {
  try {
    const { data, status } = await api.delete(`/deletar_usuario/${id_usuario}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Erro ao deletar funcionários!");
      return;
    }
  }
}
