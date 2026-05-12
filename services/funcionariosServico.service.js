import { React, useState } from "react";
import axios from "axios";
import { api } from "../api/api-config";

export async function TodosFuncionarios() {
  try {
    const { data, status } = await api.get("/usuarios");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Erro ao trazer os funcionários!");
      return;
    }
  }
}
