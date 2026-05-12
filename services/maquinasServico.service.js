import { React, useState } from "react";
import axios from "axios";
import { api } from "../api/api-config";

export async function TodasMaquinas() {
  try {
    const { data, status } = await api.get("/maquinas");
    console.log(data)
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("Erro ao trazer as máquinas!");
      return;
    }
  }
}
